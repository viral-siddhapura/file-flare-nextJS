"use server";

import { redirect } from "next/navigation";
import { signOut } from "@/auth";

export const logout = async () => {
    // Server side log out
    await signOut();
    redirect("/");
};