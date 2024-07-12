"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { BackButton } from "./back-button";
import { SocialLoginOptions } from "./social-login-options";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
}

export const CardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial,
}: CardWrapperProps) => {

    return (
        <Card className="w-[500px] shadow-lg">
            <CardHeader>
                <CardTitle className="flex justify-center">{headerLabel}</CardTitle>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {
                showSocial && (
                    <CardFooter>
                        <SocialLoginOptions />
                    </CardFooter>
                )
            }
            <CardFooter>
                <BackButton
                    href={backButtonHref}
                    label={backButtonLabel}
                />
            </CardFooter>
        </Card>
    )
}