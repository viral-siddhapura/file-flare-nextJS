import { ReactNode, createContext, useContext, useState } from "react";

interface FileUploadOptionsContextType {
    expiryDate: string;
    setExpiryDate: (date: string) => void;
    downloadLimit: string;
    setDownloadLimit: (limit: string) => void;
    isPasswordProtected: boolean;
    setIsPasswordProtected: (isProtected: boolean) => void;
}

const FileUploadOptionsContext = createContext<FileUploadOptionsContextType | undefined>(undefined);

export const useFileUploadOptions = () => {
    const context = useContext(FileUploadOptionsContext);
    if (!context) {
        throw new Error("useFileUploadOptions must be used within a FileUploadOptionsProvider");
    }
    return context;
}

export const FileUploadOptionsProvider = ({ children }: { children: ReactNode }) => {
    const [expiryDate, setExpiryDate] = useState<string>('1 day');
    const [downloadLimit, setDownloadLimit] = useState<string>('2');
    const [isPasswordProtected, setIsPasswordProtected] = useState<boolean>(false);

    return (
        <FileUploadOptionsContext.Provider
            value={{ expiryDate, setExpiryDate, downloadLimit, setDownloadLimit, isPasswordProtected, setIsPasswordProtected }}
        >
            {children}
        </FileUploadOptionsContext.Provider>
    );
};