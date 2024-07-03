"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { CardWrapper } from "./card-wrapper";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas";
import { useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";

export const LoginForm = () => {

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

        // startTransition(() => {
        //     login(values)
        //         .then((data) => {
        //             if (data?.error) {
        //                 form.reset();
        //                 setError(data?.error);
        //             }

        //             if (data?.success) {
        //                 form.reset();
        //                 setSuccess(data?.success);
        //             }

        //             if (data?.twoFactor) {
        //                 setShowTwoFactor(true);
        //             }
        //         })
        //         .catch((error) => {
        //             setError("Something went wrong.");
        //         });
        // });
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
                        backButtonLabel="Not a member yet?"
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
            </Tabs>
        </main>
    )
}