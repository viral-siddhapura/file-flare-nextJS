import { CopyIcon, InfoIcon, LinkIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useFileUploadOptions } from "../upload/file-upload-options-context";

const ViewUploadedFiles = () => {

    // use context of useFileUploadOptions and get all values
    const { expiryDate, downloadLimit, isPasswordProtected, emails } = useFileUploadOptions();

    const generateLink = () => {
        console.log("Expiry Date:", expiryDate);
        console.log("Download Limit:", downloadLimit);
        console.log("Password Protection:", isPasswordProtected ? "Enabled" : "Disabled");
        console.log("Emails:", emails);
    }

    return (
        <div className="flex flex-col items-center justify-center p-6 bg-white border-2 border-green-500 rounded-full w-[470px] h-[470px] mx-auto">
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm5 7.59l-5.59 5.59a1 1 0 0 1-1.42 0L7 12.42a1 1 0 0 1 1.42-1.42L11 13.17l4.59-4.59a1 1 0 0 1 1.42 1.42z" />
                </svg>
            </div>
            <h2 className="mt-4 text-xl font-bold text-center text-gray-900">Link is created securely</h2>
            <p className="mt-2 text-center text-gray-500">
                Make sure to copy the password to access the files.
                <InfoIcon className="inline-block w-4 h-4 ml-1 text-gray-400" />
            </p>
            <div className="relative flex items-center justify-center mt-4">
                <Input type="text" value="2EEF7D" readOnly className="w-40 p-2 text-center border rounded" />
                <Button variant="ghost" className="absolute right-0 p-2">
                    <CopyIcon className="w-5 h-5 text-gray-500" />
                </Button>
            </div>
            <div className="flex flex-col justify-center mt-6">
                <Button variant="ghost" onClick={generateLink}>
                    <div className="flex flex-col items-center">
                        <LinkIcon className="w-5 h-5 text-blue-500" />
                        <span className="text-sm text-black">Copy Link</span>
                    </div>
                </Button>
            </div>
        </div>
    )

}

export default ViewUploadedFiles;