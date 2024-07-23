import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from './lib/db';
import { getUserById } from './data/user';
import { getTwoFactorConfirmationById } from './data/two-factor-confirmation';

export const {
    handlers: {GET, POST},
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages:{
        signIn: '/auth/login',
        error: '/auth/error',
    },
    events: {
        async linkAccount({user}){
            await db.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    emailVerified: new Date(),
                },
            });
        }
    },
    callbacks: {

        async signIn({ user, account }) {
            // console.log({
            //     user,
            //     account,
            // });

            // Allow OAuth without email verification
            if (account?.provider !== 'credentials') {
                return true;
            }   

            // Prevent signIn without email verification
            const existingUser = await getUserById(user.id as string);
            if (!existingUser?.emailVerified) {
                return false;
            }

            // TODO: Add 2FA check here
            if (existingUser.isTwoFactorAuthEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationById(existingUser.id);
                // console.log(twoFactorConfirmation);
                if (!twoFactorConfirmation) {
                    return false;
                }

                // Delete two factor confirmation for next sign in
                await db.twoFactorConfirmation.delete({
                    where: {
                        id: twoFactorConfirmation.id,
                    },
                });
            }

            return true;
        },
        async session({ token, session }) {
            console.log({
                sessionToken: token,
            });
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            return session;
        },
        async jwt({ token }){
            if (!token.sub){
                return token;
            }

            const exisitingUser = await getUserById(token.sub);
            if (!exisitingUser){
                return token;
            }

            return token;
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt', maxAge: 60 * 60 },
    ...authConfig,
});