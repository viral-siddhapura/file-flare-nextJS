interface ProtectedLayoutProps {
    children: React.ReactNode;
}

const ProtectedLayout = ({ children } : ProtectedLayoutProps) => {
    return (
        <div className="h-full flex flex-col items-center justify-center">
            {children}
        </div>
    );
};

export default ProtectedLayout;