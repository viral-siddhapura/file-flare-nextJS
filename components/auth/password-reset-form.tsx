import { error } from "console"
import { Form, useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form"
import { CardWrapper } from "./card-wrapper"
import { FormError } from "./form-error"
import { FormSuccess } from "./form-success"
import { Input } from "../ui/input"
import { ResetSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useTransition } from "react"
import { z } from "zod"
import { reset } from "@/actions/reset"

export const PasswordResetForm = () => {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        setError("");
        setSuccess("");

        console.log(values);

        startTransition(() => {
            reset(values)
                .then((data) => {
                    setError(data?.error);
                    //  TODO: Add when we add 2FA support
                    setSuccess(data?.success);
                });
        });
    };

    return (
        <main className="flex flex-col items-center w-full py-40">
            <CardWrapper
                headerLabel={"Forgot Your Password?"}
                backButtonLabel={"Back to Login"}
                backButtonHref={"/auth/login"}
            >
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
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
                                                placeholder="john.doe@example.com"
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
                            Send Reset Email
                        </Button>
                    </form>
                </Form>
            </CardWrapper>
        </main>
    )
}