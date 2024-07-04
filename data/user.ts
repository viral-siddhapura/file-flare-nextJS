import { db } from "@/lib/db";
import { UserPlus } from "lucide-react";

export const getUserbyEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                email,
            }
        });

        return user;
    } catch (error) {
        return null;
    }
};

export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                id,
            }
        });

        return user;
    } catch (error) {
        return null;
    }
};