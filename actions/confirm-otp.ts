"use server";

import { getTwoFactorConfirmationById } from "@/data/two-factor-confirmation";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { generateTwoFactorToken } from "@/lib/tokens";
import { sendTwoFactorEmail } from "@/lib/mail";

export const confirmOtp = async (code: string, email: string, password: string) => {

    console.log("pin is : ", code);
    console.log("email is : ", email);

    const existingUser = await getUserByEmail(email);
    console.log("existing user in OTP calling API is: ", existingUser);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return {
            error: "User does not exists!",
        };
    }

    if (existingUser.isTwoFactorAuthEnabled && existingUser.email) {
        if (code !=null && code !== "") {

            // TODO: Verify two factor code
            const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
            if (!twoFactorToken) {
                return { error: "Invalid two factor token!" };
            }
            if (twoFactorToken.token !== code) {
                return { error: "Invalid two factor token!" };
            }

            const hasExpired = new Date() > new Date(twoFactorToken.expiresAt);
            if (hasExpired) {
                return { error: "Two factor token has expired!" };
            }

            await db.twoFactorToken.delete({
                where: {
                    id: twoFactorToken.id,
                },
            });

            const existingConfirmation = await getTwoFactorConfirmationById(twoFactorToken.id);
            if (existingConfirmation) {
                await db.twoFactorConfirmation.delete({
                    where: {
                        id: existingConfirmation.id,
                    },
                });
            }

            await db.twoFactorConfirmation.create({
                data: {
                    userId: existingUser.id,
                },
            });

            return { success: "OTP verified!" };

        } else {
            console.log("code is not generated yet, so send email immediately");
            const twoFactorToken = await generateTwoFactorToken(existingUser.email);
            await sendTwoFactorEmail(existingUser.email, twoFactorToken.token);
            return { success: "OTP sent!" };
        }

    } else {
        console.log("bad things can happen!!");
        console.log(existingUser.isTwoFactorAuthEnabled);
        console.log(existingUser.email);
    }
}