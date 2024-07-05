import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

import bcrypt from "bcryptjs";
import { getUserbyEmail } from "@/data/user";
import { LoginSchema } from "./schemas";

/***
 *  This is the new auth.config.ts file. It's used for Authentication providers configuration.
 *  Providers are used to authenticate users with different services like Google, Facebook, Github, etc.
 */

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);

                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;

                    const user = await getUserbyEmail(email);
                    if (!user || !user.password) {
                        return null;
                    }

                    const passwordMatch = await bcrypt.compare(
                        password, 
                        user.password
                    );

                    if (passwordMatch) {
                        return user;
                    }
                }
                return null;
            }
        }),
    ],
} satisfies NextAuthConfig;