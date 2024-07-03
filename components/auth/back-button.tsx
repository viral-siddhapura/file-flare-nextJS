"use client";

import Link from "next/link";
import { Button } from "../ui/button";

interface BackButtonProps {
    href: string;
    label: string;
}

export const BackButton = ({ href, label }: BackButtonProps) => {
    return (
        <Button
            variant="link"
            size="sm"
            className="font-normal w-full"
            asChild
        >
            <Link href={href} className="text-blue-500">
                {label}
            </Link>
        </Button>
    )
}