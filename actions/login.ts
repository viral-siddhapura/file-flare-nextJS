"use server"

import { LoginSchema } from "@/schemas";
import * as z from 'zod';
import { generateVerificationToken, generateTwoFactorToken } from "@/lib/tokens";
import { sendVerificationEmail, sendTwoFactorEmail } from "@/lib/mail";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { OTP_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

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

    if(existingUser.isTwoFactorAuthEnabled && existingUser.email) {
        console.log("code is not generated yet, so send email immediately");
        const twoFactorToken = await generateTwoFactorToken(existingUser.email);
        await sendTwoFactorEmail(existingUser.email, twoFactorToken.token);

        try {
            console.log("now we are redirecting to OTP_REDIRECT after signIn via credential part: ",OTP_REDIRECT);
            await signIn("credentials", {
                email,
                password,
                redirectTo: OTP_REDIRECT,
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