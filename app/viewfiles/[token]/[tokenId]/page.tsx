"use client";

import Image from "next/image";
import { InfoIcon, EyeOffIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { checkViewFilesTokenExpired } from "@/actions/check-view-files-token-expired";
import { verifyTokenPassword } from "@/actions/verify-token-password";

export default function TokenPage({ params }: { params: { token: string, tokenId: string } }) {

    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
  
    const [isTokenExpired, setIsTokenExpired] = useState<boolean>(false);

    const fullToken = `${params.token}/${params.tokenId}`;

    useEffect(() => {
        const checkToken = async () => {
            const isTokenExpired = await checkViewFilesTokenExpired(fullToken);
            console.log("isTokenExpired is : ", isTokenExpired);

            setIsTokenExpired(isTokenExpired);
        };
        checkToken();
    }, [fullToken]);

    console.log("TokenPage rendered with token:", fullToken);
    const pathname = usePathname();
    console.log("pathname is : ", pathname);

    const handleUnlock = async () => {
        const result = await verifyTokenPassword(fullToken, password);
        if (result.success) {
          console.log(result.message);
          router.push(`/`);
        } else {
          setError(result.message);
        }
      };

    return (
        <>
            {
                !isTokenExpired && (
                    <div className="flex flex-col items-center justify-center h-screen">
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
                                <Input 
                                type="password" 
                                placeholder="Password" 
                                className="w-full"
                                onChange={(e) => setPassword(e.target.value)} />
                                <EyeOffIcon className="absolute right-3 top-3 w-4 h-4" />
                            </div>
                            {error && <p className="text-red-500 mt-2">{error}</p>}
                            <Button className="w-full default mt-4" onClick={handleUnlock}>Unlock</Button>
                        </div>
                    </div>
                )
            }
        </>
    );
}
