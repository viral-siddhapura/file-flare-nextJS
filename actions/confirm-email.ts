"use server"

import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/user"
import { getVerficationTokenByToken } from "@/data/verification-token"

export const confirmEmail = async (token: string) => {
    const existingToken = await getVerficationTokenByToken(token);

    if (!existingToken) {
        return {
            error: "Token does not exists!",
        };
    }

    const hasExpired = new Date() > new Date(existingToken.expires);

    if (hasExpired){
        return {
            error: "Token has expired",
        };
    }

    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) {
        return {
            error: "Email does not exists!",
        };
    }

    await db.user.update({
        where: {
            id: existingUser.id,
        },
        data: {
            emailVerified: new Date(),
            email: existingToken.email,
        },
    });

    await db.verificationToken.delete({
        where: {
            id: existingToken.id,
        },
    });

    return {
        success: "Email verified!"
    }
}