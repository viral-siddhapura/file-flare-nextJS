import { db } from "@/lib/db";

export const getTwoFactorConfirmationById = async (userId: string) => {
    try {
        const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
            where: {
                userId,
            },
        });

        console.log("twoFactorConfirmation is : ",twoFactorConfirmation);
        return twoFactorConfirmation;
    } catch {
        return null;
    }
}