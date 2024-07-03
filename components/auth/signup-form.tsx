"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { CardWrapper } from "./card-wrapper";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "@/schemas";
import { useEffect, useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { LockIcon, MailCheckIcon } from "lucide-react";
import Link from "next/link";
import { count } from "console";

export const RegisterForm = () => {

    const [countdown, setCountdown] = useState<number>(10);
    const [codeError, setCodeError] = useState(false)
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown === 0) {
                    setCodeError(true)
                    clearInterval(timer)
                    return 0
                }
                return prevCountdown - 1
            })
        }, 1000)
        return () => clearInterval(timer)
    }, []);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = time % 60
        return `${minutes}:${seconds.toString().padStart(2, "0")}`
    }

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");

        console.log(values);
    };

    return (
        <main className="flex flex-col items-center w-full py-40">
            <Tabs defaultValue="account" className="w-[600px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">1. Account</TabsTrigger>
                    <TabsTrigger value="verification">2. Verification</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <CardWrapper
                        headerLabel="Create Secure Account"
                        backButtonLabel="Already have an account?"
                        backButtonHref="/auth/login"
                    >
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-6"
                            >
                                <div className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={isPending}
                                                        type="email"
                                                        placeholder="cool-email@domain.com"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={isPending}
                                                        placeholder="******"
                                                        type="password"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirm Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={isPending}
                                                        placeholder="******"
                                                        type="password"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormError message={error} />
                                <FormSuccess message={success} />
                                <Button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full"
                                >
                                    Create an account
                                </Button>
                            </form>
                        </Form>
                    </CardWrapper>
                </TabsContent>
                <TabsContent value="verification">
                    <Card className="w-[600px] shadow-lg">
                        <CardHeader className="flex flex-col items-center text-center">
                            <MailCheckIcon className="w-16 h-16" />
                            <CardTitle className="text-2xl font-semibold">Authenticate Your Account</CardTitle>
                            <CardDescription className="text-gray-500">An email with a 6 digit verification code has been sent to your email.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-start mt-5">
                            <div className="relative flex items-center w-full">
                                <Input type="text" placeholder="Verification Code" className="flex-1 pr-10" />
                                <LockIcon className="absolute w-5 h-5 text-gray-500 right-2" />
                            </div>
                            {
                                countdown === 0 && <div className="text-red-500">Time expired. Please request a new code.</div>
                            }
                        </CardContent>
                        <CardFooter className="flex flex-col items-center justify-between">
                            {
                                countdown > 0 && <div className="text-xl text-black text-center font-semibold">{formatTime(countdown)}</div>
                            }
                            {
                                countdown === 0 && <div>
                                    <span>Didn't receive a code? </span>
                                    <Link href="#" className="text-blue-600 hover:underline" prefetch={false}>
                                        Request again
                                    </Link>
                                </div>
                            }
                            <Button
                                variant="default"
                                disabled={countdown === 0}
                                className="w-full mt-5"
                            >
                                Verify Account
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </main>
    )
}