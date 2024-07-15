"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardWrapper } from "./card-wrapper";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas";
import { useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { login } from "@/actions/login";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export const LoginForm = () => {

    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email Already in use with different provider" : "";

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
                    setError(error.message);
                });
        });
    };

    return (
        <main className="py-40">
            <CardWrapper
                headerLabel={"Create an Account"}
                backButtonLabel={"Not a member yet? Register here."}
                backButtonHref={"/auth/signup"}
                showSocial
            >
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        {
                            showTwoFactor && (
                                <FormField
                                    control={form.control}
                                    name="code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Two Factor Code</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder="123456"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )
                        }
                        {
                            !showTwoFactor && (
                                <div className="space-y-4">
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
                            )
                        }
                        <FormError message={error || urlError} />
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
        </main>
    )
}


