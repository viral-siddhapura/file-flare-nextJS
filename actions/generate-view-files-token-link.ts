"use server";

import { db } from "@/lib/db";

export const generateViewFilesTokenLink = async (token: string, numberOfExpiryDays: number, isPasswordProtected: boolean, password: string) => {

    try {
        const existingToken = await db.viewFilesPasswordToken.findUnique({
            where: {
                token: token,
            },
        });

        if (existingToken) {
            // Update existing token
            const updatedToken = await db.viewFilesPasswordToken.update({
                where: { token: token },
                data: {
                    expiresAt: new Date(Date.now() + numberOfExpiryDays * 24 * 60 * 60 * 1000),
                    password: password,
                },
            });
            const existingLink = `http://localhost:3000/viewfiles/${updatedToken.token}`
            return existingLink;
        } else {
            // Create new token
            const newToken = await db.viewFilesPasswordToken.create({
                data: {
                    token: token,
                    expiresAt: new Date(Date.now() + numberOfExpiryDays * 24 * 60 * 60 * 1000),
                    password: password,
                },
            });

            const newLink = `http://localhost:3000/viewfiles/${newToken.token}`;
            return newLink;
        }
    } catch (error) {
        console.error("Error generating token link:", error);
        return null;
    }
}