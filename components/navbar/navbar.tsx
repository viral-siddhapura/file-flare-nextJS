"use client";

import Link from "next/link"
import Image from "next/image"
import { Button } from "../ui/button";
import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import ShimmerButton from "../magicui/shimmer-button";
import ShinyButton from "../magicui/shiny-button";

export default function NavBar() {

    const currentSession = useCurrentUser();
    const userData = currentSession ? JSON.parse(JSON.stringify(currentSession)) : null;

    const userEmail = userData?.email;
    const userRole = userData?.role;
    const userImage = userData?.image;
    const userName = userData?.name;

    console.log(userEmail, userRole, userImage, userName);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className="bg-white shadow-md">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Image src="/logo.svg" alt="File-Flare" width={48} height={48} />
                        <h1 className="ml-2 text-xl font-bold">
                            The File <span className="text-emerald-500">Flare</span>
                        </h1>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        <Link href="/features" className="text-black font-semibold" prefetch={false}>
                            Features
                        </Link>
                        <Link href="/about" className="text-black font-semibold" prefetch={false}>
                            About
                        </Link>
                        <Link href="/history" className="text-black font-semibold" prefetch={false}>
                            History
                        </Link>
                        {userData ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-black font-semibold">Hi, {userName} </span>
                                <Link href="/">
                                    <button type="submit" onClick={() => logout()}>Log out</button>
                                </Link>
                            </div>
                        ) : (
                            <Link href="/auth/signup">
                                <ShinyButton text="Login"/>
                                {/* <Button variant="login" size="lg">
                                    Login
                                </Button> */}
                            </Link>
                        )}
                    </div>
                    <div className="md:hidden flex items-center">
                        <button onClick={toggleMenu} className="text-black">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="flex flex-col items-center justify-center px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-gray-100" prefetch={false}>
                            Features
                        </Link>
                        <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-gray-100" prefetch={false}>
                            About
                        </Link>
                        <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-gray-100" prefetch={false}>
                            History
                        </Link>
                        {userData ? (
                            <>
                                <span className="block px-3 py-2 text-base font-medium text-black">Hi, {userName}</span>
                                <button onClick={() => logout()} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-black hover:bg-gray-100">
                                    Log out
                                </button>
                            </>
                        ) : (
                            <Link href="/auth/signup" className="block w-full">
                                <Button variant="login" size="lg" className="w-full">
                                    Login
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}