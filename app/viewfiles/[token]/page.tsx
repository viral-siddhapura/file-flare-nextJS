"use client";

import Image from "next/image";
import { InfoIcon, EyeOffIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { checkViewFilesTokenExpired } from "@/actions/check-view-files-token-expired";

export default function TokenPage({ params }: { params: { token: string } }) {

    useEffect(() => {
        const checkToken = async () => {
            const token = params.token;
            const isTokenExpired = await checkViewFilesTokenExpired(token);
            console.log("isTokenExpired is : ", isTokenExpired);
        };
        checkToken();
    }, [params.token]);

    console.log("TokenPage rendered with token:", params.token);
    const pathname = usePathname();
    console.log("pathname is : ", pathname);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Hello World</h1>
            <p>Token: {params.token}</p>

            <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-32 h-32 border-2 shadow-md rounded-full">
                    <Image
                        src="/lock.svg"
                        alt="Lock"
                        width={64}
                        height={64}
                    />
                </div>
                <h2 className="text-4xl font-bold text-center">This Link is password protected</h2>
                <p className="text-center text-sm">
                    You need to ask the sender for the password to unlock and access files <span />
                    <InfoIcon className="inline-block w-4 h-4" />
                </p>
            </div>
            <div className="w-full max-w-lg p-4 mt-10">
                <div className="relative">
                    <Input type="password" placeholder="Password" className="w-full" />
                    <EyeOffIcon className="absolute right-3 top-3 w-4 h-4" />
                </div>
                <Button className="w-full default mt-4">Unlock</Button>
            </div>

        </div>
    );
}
