"use server";

import * as z from "zod";
import { NewPasswordSchema } from "@/schemas";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export const resetPassword = async (
    values: z.infer<typeof NewPasswordSchema>,
    token?: string | null,
) => {
    if (!token) {
        return {
            error: "Missing token!",
        };
    }

    const validatedFields = NewPasswordSchema.safeParse(values);
    if (!validatedFields.success) {
        return {
            error: "Invalid Password",
        };
    }

    const { password } = validatedFields.data;

    // Token validations here
    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) {
        return {
            error: "Invalid token",
        };
    }

    const hasExpired = new Date() > new Date(existingToken.expiresAt);
    if (hasExpired) {
        return {
            error: "Token has expired",
        };
    }

    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) {
        return {
            error: "No user found with this email address.",
        };
    }

    // Update password here
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.user.update({
        where: {
            id: existingUser.id,
        },
        data: {
            password: hashedPassword,
        },
    });

    // Delete token here
    await db.passwordResetToken.delete({
        where: {
            id: existingToken.id,
        },
    });

    return {
        success: "Password has been reset successfully",
    };
}