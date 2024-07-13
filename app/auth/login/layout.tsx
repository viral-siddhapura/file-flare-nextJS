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
