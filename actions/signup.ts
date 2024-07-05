"use server";
import { RegisterSchema } from "@/schemas";
import * as z from 'zod';

import bcrypt from 'bcryptjs';
import { getUserbyEmail } from "@/data/user";
import { db } from "@/lib/db";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const signup = async (values : z.infer<typeof RegisterSchema>) => {

    const validateFields = RegisterSchema.safeParse(values);

    if (!validateFields.success){
        return {
            error: "Invalid fields!!",
        }
    }

    const { email, password, confirmPassword } = validateFields.data;
    console.log(email, password, confirmPassword);

    if(password !== confirmPassword){
        return {
            error: "Passwords do not match!!",
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedConfirmPassword = hashedPassword;

    const existingUser = await getUserbyEmail(email);
    if(existingUser){
        return {
            error: "Email address already exists.",
        }
    }

    // Creating a user
    await db.user.create({
        data: {
            email,
            password: hashedPassword,
            confirmPassword: hashedConfirmPassword,
        },
    });

    // Now generate the verification token
    const verificationToken = await generateVerificationToken(email);

    // send verification email to the user to activate the account
    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return {
        success: "Please verify your email to activate your account.",
    }

};