import LoginNavBar from "@/components/auth/login-nav-bar";
import { cn } from "@/lib/utils";

export default function PasswordResetLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={cn(
            "min-h-screen bg-background font-sans antialiased"
        )}>
            <LoginNavBar />
            {children}</div>
    );
}
