import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

import bcrypt from "bcryptjs";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";

import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook"
import Twitter from "next-auth/providers/twitter"

/***
 *  This is the new auth.config.ts file. It's used for Authentication providers configuration.
 *  Providers are used to authenticate users with different services like Google, Facebook, Github, etc.
 */

export default {
    providers: [
        Google(
            {
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            }
        ),
        Credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);

                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;

                    const user = await getUserByEmail(email);
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