"use server"

import { LoginSchema } from "@/schemas";
import * as z from 'zod';
import { generateVerificationToken, generateTwoFactorToken } from "@/lib/tokens";
import { sendVerificationEmail, sendTwoFactorEmail } from "@/lib/mail";
import { getUserByEmail } from "@/data/user";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getTwoFactorConfirmationById } from "@/data/two-factor-confirmation";
import { db } from "@/lib/db";
import { DEFAULT_REDIRECT } from "@/routes";

export const login = async (values: z.infer<typeof LoginSchema>) => {

    const validatedFields = LoginSchema.safeParse(values);
    console.log("validated fields are : ", validatedFields);

    if (!validatedFields.success) {
        return {
            error: "Invalid fields",
        };
    }

    const { email, password, code } = validatedFields.data;
    console.log("email, password, code are : ", email, password, code);

    const existingUser = await getUserByEmail(email);
    if (!existingUser || !existingUser.email || !existingUser.password) {
        return {
            error: "User does not exists!",
        };
    }

    console.log("existingUser is : ", existingUser);

    // prevent login if email is not verified, send an email for verfication again
    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email);
        await sendVerificationEmail(verificationToken.email, verificationToken.token);
        return { success: "Please verify your email address. Confirmation Email Sent!" };
    }

    console.log("existingUser.isTwoFactorAuthEnabled is : ", existingUser.isTwoFactorAuthEnabled);

    if (existingUser.isTwoFactorAuthEnabled && existingUser.email) {
        if (code) {
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
            const twoFactorToken = await generateTwoFactorToken(existingUser.email);
            await sendTwoFactorEmail(existingUser.email, twoFactorToken.token);
            return { twoFactor: true };
        }

        try {
            await signIn("credentials", {
                email,
                password,
                redirect: true,
                redirectTo: DEFAULT_REDIRECT,
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

    } else {
        console.log("bad things can happen!!");
        console.log(existingUser.isTwoFactorAuthEnabled);
        console.log(existingUser.email);
    }
}