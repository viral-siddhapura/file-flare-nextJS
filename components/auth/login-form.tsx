"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardWrapper } from "./card-wrapper";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas";
import { useEffect, useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { ConfirmationEmailForm } from "./confirmation-email-form";
import { login } from "@/actions/login";
import Link from "next/link";

export const LoginForm = () => {

    const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");

        console.log(values);

        startTransition(() => {
            login(values)
                .then((data) => {
                    if (data?.error) {
                        form.reset();
                        setError(data?.error);
                    }

                    if (data?.success) {
                        form.reset();
                        setSuccess(data?.success);
                    }

                    if (data?.twoFactor) {
                        setShowTwoFactor(true);
                    }
                })
                .catch((error) => {
                    setError("Something went wrong.");
                });
        });
    };

    return (
        <main className="flex flex-col items-center w-full py-40">
            {
                showTwoFactor && (
                    <ConfirmationEmailForm />
                )
            }
            {
                !showTwoFactor && (
                    <CardWrapper
                        headerLabel="Create an Account"
                        backButtonLabel="Not a member yet? Register here."
                        backButtonHref="/auth/signup"
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
                                                <Button
                                                    size="sm"
                                                    variant="link"
                                                    asChild
                                                    className="px-0 font-normal"
                                                >
                                                    <Link href={"/auth/reset"}>
                                                        Forgot Password?
                                                    </Link>
                                                </Button>
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
                                    {showTwoFactor ? "Verify Code" : "Login"}
                                </Button>
                            </form>
                        </Form>
                    </CardWrapper>
                )
            }
        </main>
    )
}