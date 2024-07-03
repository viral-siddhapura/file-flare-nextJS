import { cn } from "@/lib/utils";

export default function SignUpLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={cn(
            "min-h-screen bg-background font-sans antialiased"
        )}>
            {children}</div>
    );
}
