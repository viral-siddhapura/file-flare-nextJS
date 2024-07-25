"use server";

import { db } from "@/lib/db";

export const checkViewFilesTokenExpired = async (token: string) => {
    try {
        const tokenFromDb = await db.viewFilesPasswordToken.findFirst({
            where: {
                token: token,
            },
        });

        console.log("tokenFromDb is : ", tokenFromDb);
        
        if(!tokenFromDb) {
            return true;
        }

        if(tokenFromDb.expiresAt < new Date()) {
            return true;
        }

        return false;
    }
    catch (error) {
        console.error("Error checking token expired:", error);
        return false;
    }
};