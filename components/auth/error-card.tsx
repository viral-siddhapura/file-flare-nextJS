import { BackButton } from "./back-button";
import { Card, CardFooter, CardHeader } from "../ui/card";
import React from "react";

export const ErrorCard = () => {
    return (
        <Card className="w-[600px] shadow-md">
            <CardHeader>
                <header className="text-muted-foreground text-sm">"Awe! Something went wrong!"</header>
            </CardHeader>
            <CardFooter>
                <BackButton label="Back to Login" href="/auth/login" />
            </CardFooter>
        </Card>
    );
};