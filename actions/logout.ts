"use server";

import { signOut } from "@/auth";

export const logout = async () => {
    // Server side log out
    await signOut();
};