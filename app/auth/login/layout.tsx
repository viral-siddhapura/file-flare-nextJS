import LoginNavBar from "@/components/auth/login-nav-bar";
import { cn } from "@/lib/utils";

export default function LoginPageLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="h-full flex items-center justify-center">
            {/* <LoginNavBar /> */}
            {children}
        </div>
    );
}
