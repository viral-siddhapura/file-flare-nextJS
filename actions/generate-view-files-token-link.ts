"use server";

import { db } from "@/lib/db";

export const generateViewFilesTokenLink = async (numberOfExpiryDays: number, isPasswordProtected: boolean, password: string) => {
    const randomToken = Math.random().toString(36).substring(2, 15) + "-" + Math.random().toString(36).substring(2, 15);

    // this randomToken must be expired after numberOfExpiryDays
    const tokenExpiresAt = new Date(new Date().getTime() + numberOfExpiryDays * 24 * 60 * 60 * 1000);
    console.log("tokenExpiresAt is : ", tokenExpiresAt);

    // now save this randomToken and tokenExpiresAt in database
    const response = await db.viewFilesPasswordToken.create({
        data: {
            token: randomToken,
            expiresAt: tokenExpiresAt,
            password: password
        }
    });

    if (!response) {
        throw new Error("Failed to generate token link");
    }else{
        const link = `http://localhost:3000/viewfiles/${randomToken}`;
        console.log("link is : ", link);
        return link;
    }
}