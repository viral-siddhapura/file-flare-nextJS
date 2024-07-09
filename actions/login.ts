"use server"

import { LoginSchema } from "@/schemas";
import * as z from 'zod';
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateVerificationToken, generateTwoFactorToken } from "@/lib/tokens";
import { sendVerificationEmail, sendTwoFactorEmail } from "@/lib/mail";
import { getUserByEmail } from "@/data/user";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { db } from "@/lib/db";
import { getTwoFactorConfirmationById } from "@/data/two-factor-confirmation";
import bcrypt from "bcryptjs";

export const login = async (values: z.infer<typeof LoginSchema>) => {

    const validatedFields = LoginSchema.safeParse(values);
    console.log("validated fields are : ",validatedFields);

    if(!validatedFields.success){
        return {
            error: "Invalid fields",
        };
    }

    const { email, password, code } = validatedFields.data;
    console.log("email, password, code are : ",email, password, code);

    const existingUser = await getUserByEmail(email);
    if (!existingUser || !existingUser.email || !existingUser.password) {
        return {
            error: "User does not exists!",
        };
    }

    console.log("existingUser is : ",existingUser);

    // prevent login if the passwords are not matched? - throw error
    const passwordMatch = await bcrypt.compare(
        password, 
        existingUser.password
    );
    if(!passwordMatch){
        return {
            error: "Invalid password",
        };
    }

    // prevent login if email is not verified, send an email for verfication again
    if(!existingUser.emailVerified){
        const verificationToken = await generateVerificationToken(existingUser.email);
        await sendVerificationEmail(verificationToken.email, verificationToken.token);
        return { success: "Please verify your email address. Confirmation Email Sent!" };
    }

    if(existingUser.isTwoFactorAuthEnabled && existingUser.email){
        if (code) {
            
            console.log("code is : ",code);

            // TODO: Verify two factor code
            const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
            if (!twoFactorToken){
                return { error: "Invalid two factor token!" };
            }
            if (twoFactorToken.token !== code) {                
                return { error: "Invalid two factor token!" };
            } 

            const hasExpired = new Date() > new Date(twoFactorToken.expiresAt);
            if (hasExpired) {
                return { error: "Two factor token has expired!" };
            }

            await db.twoFactorToken.delete({
                where: {
                    id: twoFactorToken.id,
                },
            });

            const exisingConfirmation = await getTwoFactorConfirmationById(twoFactorToken.id);
            if (exisingConfirmation) {
                await db.twoFactorConfirmation.delete({
                    where: {
                        id: exisingConfirmation.id,
                    },
                });
            }

            await db.twoFactorConfirmation.create({
                data: {
                    userId: existingUser.id,
                },
            });

        } else {
            console.log("code is not generated yet, so send email immediately");
            const twoFactorToken = await generateTwoFactorToken(existingUser.email);
            await sendTwoFactorEmail(existingUser.email, twoFactorToken.token);
            return { twoFactor: true };
        }

        try {
            await signIn("credentials", {
                email,
                password,
                redirectTo: DEFAULT_LOGIN_REDIRECT,
            });
        } catch (error) {
            if (error instanceof AuthError) {
                switch (error.type) {
                    case "CredentialsSignin":
                        return { error: "Invalid credentials!" };
                    default:
                        return { error: "Something went wrong!" };
                }
            }
            throw error;
        }
    }else{
        console.log("bad things can happen!!");
        console.log(existingUser.isTwoFactorAuthEnabled);
        console.log(existingUser.email);
    }
}