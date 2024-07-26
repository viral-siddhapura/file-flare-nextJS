"use server";

import { db } from "@/lib/db";

export const checkViewFilesTokenExpired = async (token: string) => {
    try {
        const tokenFromDb = await db.viewFilesPasswordToken.findFirst({
            where: {
                token: token,
            },
        });

        if (!tokenFromDb) {
            console.log("tokeFromDB: ", tokenFromDb);
            return false;
        }

        if (tokenFromDb.expiresAt < new Date()) {
            console.log("yes token has expired");
            return true;
        }

        return false;
    }
    catch (error) {
        console.error("Error checking token expired:", error);
        return false;
    }
};