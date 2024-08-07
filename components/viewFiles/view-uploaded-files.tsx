import { CircleCheckIcon, CopyIcon, InfoIcon, LinkIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useFileUploadOptions } from "../upload/file-upload-options-context";
import { useContext, useRef, useState } from "react";
import { FileUploadContext } from "../upload/file-upload-context";
import { generateExpirationUrls } from "@/actions/generate_expiration_urls";
import { generateViewFilesTokenLink } from "@/actions/generate-view-files-token-link";
import Image from "next/image";

const ViewUploadedFiles = () => {

    const [linkCopied, setLinkCopied] = useState(false);
    const [existingToken, setExistingToken] = useState<string | null>(null);
    const { expiryDate, downloadLimit, isPasswordProtected, emails } = useFileUploadOptions();
    const { state, dispatch } = useContext(FileUploadContext);
    const passwordRef = useRef<HTMLInputElement>(null);

    const generateLink = async () => {
        console.log("Expiry Date:", expiryDate);
        console.log("Download Limit:", downloadLimit);
        console.log("Password Protection:", isPasswordProtected ? "Enabled" : "Disabled");
        console.log("Emails:", emails);
        console.log("files are : ", state.files);

        if (!existingToken) {
            const fileDetails = Array.from(state.files).map(file => ({
                fileName: file.name,
                fileType: file.type,
            }));

            console.log("file details are : ", fileDetails);

            // my expiryDate contains values as 1 day or 7 day as a string, so now remove "day" string from it
            const numberOfExpiryDays = parseInt(expiryDate.replace('day', '')) as number;
            console.log("number of expiry days is ", numberOfExpiryDays);

            const response = await generateExpirationUrls(state.files, numberOfExpiryDays);
            console.log("response of generating presigned URLs are : ", response);

            const token = response[0].token;
            console.log("token is : ", token);
            setExistingToken(token);

            response.forEach(async (element: any, index: number) => {
                console.log("element.url : ", element.url);
                console.log("element.file : ", element.file);
            });

            const password = passwordRef.current?.value || '';
            const tokenLink = await generateViewFilesTokenLink(
                token,
                numberOfExpiryDays,
                isPasswordProtected,
                password,
            );
            setLinkCopied(true);
            console.log("tokenLink is : ", tokenLink);
            navigator.clipboard.writeText(tokenLink as string);
        } else {
            // Use the existing token to regenerate the link
            const numberOfExpiryDays = parseInt(expiryDate.replace('day', '')) as number;
            const password = passwordRef.current?.value || '';
            const tokenLink = await generateViewFilesTokenLink(
                existingToken,
                numberOfExpiryDays,
                isPasswordProtected,
                password,
            );

            setLinkCopied(true);
            console.log("Regenerated tokenLink is : ", tokenLink);
            navigator.clipboard.writeText(tokenLink as string);
        }
    }

    const copyPassword = () => {
        console.log(passwordRef.current?.value);
        if (passwordRef.current) {
            navigator.clipboard.writeText(passwordRef.current.value);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center p-6 bg-white border-4 border-green-500 rounded-full w-[470px] h-[470px] mx-auto">
            {
                emails.length > 0 ? (
                    <div className="flex flex-col items-center justify-center p-6">
                        <Image
                            src="/success_clouds.svg"
                            alt="Email Icon"
                            width={64}
                            height={64}
                        />
                        <h2 className="mb-2 text-lg font-semibold text-center text-gray-800">Files Sent Securely</h2>
                        <p className="mb-6 text-center text-gray-600">Your transfer will be available for {expiryDate}s.</p>
                        <Button variant="ghost" className="px-6 py-2 text-white bg-gradient-to-r from-blue-400 to-blue-600 rounded-md">
                            View Details
                        </Button>
                    </div>
                ) :
                    (
                        <>
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
                                <Input type="text" value="2EEF7D" readOnly ref={passwordRef} className="w-40 p-2 text-center border rounded" />
                                <Button variant="ghost" className="absolute right-0 p-2" onClick={copyPassword}>
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
                                {linkCopied && (
                                    <div className="mt-2 flex items-center justify-center space-x-2 text-green-500">
                                        <CircleCheckIcon className="w-5 h-5" />
                                        <span>Link copied</span>
                                    </div>
                                )}
                            </div>
                        </>
                    )
            }
        </div>
    )
}

export default ViewUploadedFiles;