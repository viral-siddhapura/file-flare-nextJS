import * as z from 'zod';

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Password should be min 6 characters long",
    }),
});

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
});

export const OtpSchema = z.object({
    pin: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
});

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(1, {
        message: "Password is required",
    }),
    code: z.string().optional(),
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(1, {
        message: "Password is required",
    }),
    confirmPassword: z.string().min(1, {
        message: "Confirm Password is required",
    }),
});

export const OTPSchema = z.object({
    pin: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
});