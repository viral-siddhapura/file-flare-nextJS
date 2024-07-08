"use client";

import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { CardWrapper } from "./card-wrapper";
import { useCallback, useEffect, useState } from "react";
import { confirmEmail } from "@/actions/confirm-email";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";

export const NewConfirmEmailForm = () => {

    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {

        if (success || error) return;

        if (!token) {
            setError("Missing token"); 
            return;
        }
        confirmEmail(token)
            .then((response) => {
                setSuccess(response.success);
                setError(response.error);
            })
            .catch((error) => {
                setError("Something went wrong!");
            });

    }, [token, success, error]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <CardWrapper
            headerLabel="Confirming your verification"
            backButtonLabel="Back to Login"
            backButtonHref="/auth/login"
        >
            <div className="flex flex-row items-center w-full justify-center">
                {!success && !error && (
                    <BeatLoader />
                )}
                <FormSuccess message={success} />
                {!success && (
                    <FormError message={error} />
                )}
            </div>

        </CardWrapper>
    );
}