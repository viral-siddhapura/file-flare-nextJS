import { v4 as uuidv4 } from 'uuid';
import { db } from './db';
import { getVerificationTokenByEmail } from '@/data/verification-token';
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getVerificationTokenByEmail(email);
    if (existingToken){
        await db.verificationToken.delete({
            where:{
                id: existingToken.id
            }
        });
    }

    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires: expires,
        }
    });

    return verificationToken;
} 

export const generateTwoFactorToken = async (email: string) => {
    // generate 6 digit token
    const token = Math.floor(100000 + Math.random() * 900000).toString();

    //  Expires after 3 minutes
    const expires = new Date(new Date().getTime() + 180 * 1000);

    const existingToken = await getTwoFactorTokenByEmail(email);
    if (existingToken){
        await db.twoFactorToken.delete({
            where:{
                id: existingToken.id
            }
        });
    }

    const twoFactorToken = await db.twoFactorToken.create({
        data: {
            email,
            token,
            expiresAt: expires,
        }
    });

    return twoFactorToken;

}