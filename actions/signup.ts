"use server";
import { RegisterSchema } from "@/schemas";
import * as z from 'zod';

import bcrypt from 'bcryptjs';
import { getUserByEmail } from "@/data/user";
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

    const { email, password, name } = validateFields.data;
    console.log(email, password, name);

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);
    if(existingUser){
        return {
            error: "Email address already exists.",
        }
    }

    // Creating a user
    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
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