import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmedLink = `http://localhost:3000/auth/confirm-email?token=${token}`;

    await resend.emails.send({
        to: email,
        from: "file-flare@resend.dev",
        subject: "Confirm your email address",
        html: `<p>Click the link below to confirm your email address:</p><a href="${confirmedLink}">Confirm your email</a>`,
    })
}

export const sendTwoFactorEmail = async (
    email: string,
    token: string,
) => {
    await resend.emails.send({
        to: email,
        from: "file-flare@resend.dev",
        subject: "Two-factor authentication",
        html: `<p>Your Two Factor Authentication Code:${token}</p>`,
    });
}