// actions/verify-token-password.ts
"use server"

import { db } from "@/lib/db";

export async function verifyTokenPassword(token: string, password: string) {
    const tokenData = await db.viewFilesPasswordToken.findUnique({
        where: { token }
    });

    if (!tokenData) {
        return { success: false, message: "Invalid token" };
    }

    if (new Date() > tokenData.expiresAt) {
        return { success: false, message: "Token has expired" };
    }

    if (tokenData.password !== password) {
        return { success: false, message: "Incorrect password" };
    }

    return { success: true, message: "Verification successful" };
}
