"use client";

import { Button } from "../ui/button"
import { FcGoogle } from "react-icons/fc";
import { FaSquareTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
  
export const SocialLoginOptions = () => {

    const onClick = (provider: "google" | "twitter" | "facebook") => {
        // call the appropriate provider
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT,
        })
    }

    return (
        <div className="w-full flex items-center gap-x-2">
            <Button
                className="w-full"
                variant={"outline"}
                size={"lg"}
                onClick={() => onClick("google")}
            >
                <FcGoogle className="h-5 w-5" />
            </Button>
            <Button
                className="w-full"
                variant={"outline"}
                size={"lg"}
                onClick={() => onClick("twitter")}
            >
                <FaSquareTwitter className="h-5 w-5" />
            </Button>
            <Button
                className="w-full"
                variant={"outline"}
                size={"lg"}
                onClick={() => onClick("facebook")}
            >
                <FaFacebook className="h-5 w-5" />
            </Button>
        </div>
    )
}