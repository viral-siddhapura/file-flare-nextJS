"use client";

import { CardHeader, CardTitle, CardFooter, Card, CardContent } from "../ui/card"
import { useState, useEffect, startTransition } from "react"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp"
import { MailCheckIcon } from "lucide-react"
import { Button } from "../ui/button"
import { confirmOtp } from "@/actions/confirm-otp";
import { useForm } from "react-hook-form";
import { OtpSchema } from "@/schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";

export const ConfirmationEmailForm = () => {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [countdown, setCountdown] = useState<number>(180);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown === 0) {
                    clearInterval(timer)
                    return 0
                }
                return prevCountdown - 1
            })
        }, 1000)
        return () => clearInterval(timer)
    }, [countdown]);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = time % 60
        return `${minutes}:${seconds.toString().padStart(2, "0")}`
    }

    const onRequestAgain = () => {
        setCountdown(180);
    }

    const form = useForm<z.infer<typeof OtpSchema>>({
        resolver: zodResolver(OtpSchema),
        defaultValues: {
            pin: "",
        },
    })

    const onSubmit = (values: z.infer<typeof OtpSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            confirmOtp(values.pin, "email", "password")
                .then((data) => {
                    if (data?.error) {
                        setError(data?.error);
                    }

                    if (data?.success) {
                        setSuccess(data?.success);
                        form.reset();
                    }

                })
                .catch((error) => {
                    setError(error);
                });
        });
    }

    return (
        <Card className="w-[600px] shadow-lg">
            <CardHeader className="flex flex-col items-center text-center">
                <MailCheckIcon className="w-16 h-16" />
                <CardTitle className="text-2xl font-semibold">Authenticate Your Account</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <div>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center justify-center space-y-6">
                            <FormField
                                control={form.control}
                                name="pin"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>One-Time Password</FormLabel>
                                        <FormControl>
                                            <InputOTP maxLength={6} {...field}>
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={0} />
                                                    <InputOTPSlot index={1} />
                                                    <InputOTPSlot index={2} />
                                                    <InputOTPSlot index={3} />
                                                    <InputOTPSlot index={4} />
                                                    <InputOTPSlot index={5} />
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </FormControl>
                                        <FormDescription>
                                            Please enter the one-time password sent to your email address.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormError message={error} />
                            <FormSuccess message={success} />
                            {
                                countdown === 0 ? (
                                    <div className="text-red-500 mt-4">Time has expired. Please request a new code.</div>
                                ) : (
                                    null
                                )
                            }
                            {
                                countdown > 0 && <div className="text-md text-black text-center mt-4">Remaining time: {formatTime(countdown)}</div>
                            }
                            {
                                countdown === 0 && (
                                    <div>
                                        <span>Didn&apos;t receive a code?</span>
                                        <Button
                                            variant={"link"}
                                            className="text-blue-600 text-md"
                                            onClick={onRequestAgain}
                                        >
                                            Request again
                                        </Button>
                                    </div>
                                )
                            }
                            <Button type="submit" className="mt-4">Submit</Button>
                        </form>
                    </div>
                </Form>
            </CardContent>
        </Card>
    )
}