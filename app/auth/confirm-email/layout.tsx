import LoginNavBar from "@/components/auth/login-nav-bar";
import { cn } from "@/lib/utils";

export default function ConfirmEmailLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={cn(
            "h-full flex flex-col items-center justify-center bg-background font-sans antialiased"
        )}>
            {/* <LoginNavBar /> */}
            {children}
        </div>
    );
}
