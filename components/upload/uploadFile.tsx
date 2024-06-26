"use client";

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import UploadInformation from "./upload_information"
import { useRef, useState, useTransition } from "react"
import { uploadFileAction } from "@/actions/upload_file";
import { Input } from "../ui/input";
import UploadComplete from "./upload_complete";

const UploadFile = ({ onUploadComplete }: any) => {

    const [file, setFile] = useState<File | null>(null);
    const [isPending, startTransition] = useTransition();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleButtonClick = async () => {

        if (fileInputRef.current) {
            fileInputRef.current.click();
        }

        if (!file) {
            console.log("No file selected");
            return;
        };

        startTransition(async () => {
            try {
                // Simulate file upload action
                const data = await uploadFileAction(file);
                console.log(data.fileName, data.fileSize, data.fileType);
                onUploadComplete(); // Call the prop function to update the state in Home component
            } catch (error) {
                console.log("Error uploading file. Please try again.");
            }
        });
    };

    return (
        <>
            {
                file ? (
                    <UploadComplete files={[file]} />
                ) : (
                    <div className="flex basis-1/2 items-center justify-center">
                        <Card className="w-full max-w-md p-8 text-center">
                            <UploadInformation />
                            <CardContent>
                                <Button
                                    variant="default"
                                    className="w-full mt-8"
                                    disabled={isPending}
                                    onClick={handleButtonClick}
                                >
                                    {isPending ? "Uploading..." : "Select File(s)"}
                                </Button>
                                <Input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                />
                                <p className="mt-8 text-sm text-gray-500">You can upload upto 1 GB for free</p>
                            </CardContent>
                        </Card>
                    </div>
                )
            }
        </>
    )
}

export default UploadFile;