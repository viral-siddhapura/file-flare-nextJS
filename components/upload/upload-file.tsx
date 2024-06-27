"use client";

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import UploadInformation from "./upload-information"
import { useRef, useState, useTransition } from "react"
import { uploadFileAction } from "@/actions/upload_file";
import { Input } from "../ui/input";
import UploadComplete from "./upload-complete";

const UploadFile = ({ onUploadComplete }: any) => {

    const [files, setFiles] = useState<File[]>([]);
    const [isPending, startTransition] = useTransition();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFiles(Array.from(e.target.files));
        }
    };

    const onAddFiles = (newFile: File) => {
        setFiles(prevFiles => [...prevFiles, newFile]);
    };

    const deleteFile = (index: number) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    }

    const handleButtonClick = async () => {

        if (fileInputRef.current) {
            fileInputRef.current.click();
        }

        if (!files) {
            console.log("No file selected");
            return;
        };

        startTransition(async () => {
            try {
                // Simulate file upload action
                for (const file in files) {
                    const data = await uploadFileAction(files[file]);
                    console.log(data.fileName, data.fileSize, data.fileType);
                }

                // Call the prop function to update the state in Home component
                onUploadComplete();
            } catch (error) {
                console.log("Error uploading file. Please try again.");
            }
        });
    };

    return (
        <>
            {
                files.length === 0 ? (
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
                ) : (
                    <UploadComplete files={files} onAddFiles={onAddFiles} onDeleteFile={deleteFile}/>
                )
            }
        </>
    )
}

export default UploadFile;