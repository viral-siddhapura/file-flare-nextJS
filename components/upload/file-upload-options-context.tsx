import { ReactNode, createContext, useContext, useState } from "react";

interface FileUploadOptionsContextType {
    expiryDate: string;
    setExpiryDate: (date: string) => void;
    downloadLimit: string;
    setDownloadLimit: (limit: string) => void;
    isPasswordProtected: boolean;
    setIsPasswordProtected: (isProtected: boolean) => void;
    emails: string[];
    setEmails: (emails: string[]) => void;
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
    const [emails, setEmails] = useState<string[]>([]);

    return (
        <FileUploadOptionsContext.Provider
            value={{ expiryDate, setExpiryDate, downloadLimit, setDownloadLimit, isPasswordProtected, setIsPasswordProtected, emails, setEmails }}
        >
            {children}
        </FileUploadOptionsContext.Provider>
    );
};