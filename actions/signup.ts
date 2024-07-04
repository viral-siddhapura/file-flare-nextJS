"use server";
import { RegisterSchema } from "@/schemas";
import * as z from 'zod';

import bcrypt from 'bcryptjs';
import { getUserbyEmail } from "@/data/user";
import { db } from "@/lib/db";

export const signup = async (values : z.infer<typeof RegisterSchema>) => {

    const validateFields = RegisterSchema.safeParse(values);

    if (!validateFields.success){
        return {
            error: "Invalid fields!!",
        }
    }

    const { email, password, confirmPassword } = validateFields.data;

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);

    if(password !== confirmPassword){
        return {
            error: "Passwords do not match!!",
        }
    }

    const existingUser = await getUserbyEmail(email);
    if(existingUser){
        return {
            error: "Email address already exists. Please use another email address!!",
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

    return {
        success: "User created successfully!!",
    }

};