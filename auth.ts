import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { UserRole } from '.prisma/client';
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

        async signIn({ user, account }){

            console.log({
                user,
                account,
            });

            // Allow OAuth without email verification
            if (account?.provider !== 'credentials'){
                return true;
            }   

            // Prevent signIn without email verification
            const exisitingUser = await getUserById(user.id);
            if (!exisitingUser?.emailVerified){
                return false;
            }

            // TODO: Add 2FA check here
            if (exisitingUser.isTwoFactorAuthEnabled){
                
                const twoFactorConfirmation = await getTwoFactorConfirmationById(exisitingUser.id);
                console.log({twoFactorConfirmation});
                if (!twoFactorConfirmation){
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

        async session( { token, session } ){
            console.log({
                sessionToken: token,
            })
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            if (token.role && session.user) {
                session.user.role = token.role as UserRole;
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
            
            token.role = exisitingUser.role;
            return token;
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt' },
    ...authConfig,
});