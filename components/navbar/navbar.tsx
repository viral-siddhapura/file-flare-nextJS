"use client";

import Link from "next/link"
import Image from "next/image"
import { Button } from "../ui/button";
import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function NavBar() {

    const currentSession = useCurrentUser();
    const userData = currentSession ? JSON.parse(JSON.stringify(currentSession)) : null;

    const userEmail = userData?.email;
    const userRole = userData?.role;
    const userImage = userData?.image;
    const userName = userData?.name;

    console.log(userEmail, userRole, userImage, userName);

    return (
        <div className="flex h-full bg-white">
            <div className="flex basis-1/2 items-center justify-between p-4 border-b-2">
                <div className="flex items-center space-x-4">
                    <Image src="/logo.svg" alt="File-Flare" width={64} height={64} />
                    <h1 className="text-xl font-bold">
                        The File <span className="text-emerald-500">Flare</span>
                    </h1>
                </div>
            </div>
            <div className="flex basis-1/2 items-center justify-end border-b-2">
                <div className="flex basis-1/2 items-center jusitfy-end space-x-6">
                    <Button variant="ghost" size="sm" className="text-black font-semibold">
                        <Image src="/grip.svg" alt="Upload" width={24} height={24} />
                    </Button>
                    <Link href="#" className="text-black font-semibold" prefetch={false}>
                        History
                    </Link>
                    {userData ? (
                        <div className="flex flex-items-center space-x-4">
                            <span className="text-black font-semibold">Hi, {userName} </span>
                            <Link href="/">
                                <button type="submit" onClick={() => logout()}>Log out</button>
                            </Link>
                        </div>
                    ) : (
                        <Link href="/auth/signup">
                            <Button variant="login" size="lg">
                                Login
                            </Button>
                        </Link>
                    )}
                </div >
            </div >
        </div >
    );
}