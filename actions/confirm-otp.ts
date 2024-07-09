"use server";

import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";

export const confirmOtp = async (pin: string, email: string) => {

    console.log("pin is : ", pin);
    console.log("email is : ", email);

    const existingUser = await getUserByEmail(email);
    console.log("existing user in OTP calling API is: ", existingUser);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return {
            error: "User does not exists!",
        };
    }

    // get the twofactor token from the db
    const twoFactorToken = await getTwoFactorTokenByEmail(email);
    console.log("twoFactorToken is : ", twoFactorToken);

    // Now match the pin entered by the user and twoFactorToken
    if (twoFactorToken?.token !== pin) {
        return {
            error: "Invalid pin",
        };
    }

    return {
        success: "OTP verified successfully",
    };
}