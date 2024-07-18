"use client"

import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import FileUploadOptions from "./file-upload-options"
import { useContext, useEffect, useState } from "react"
import { FileUploadContext } from "./file-upload-context"
import { useFileUploadOptions } from "./file-upload-options-context"
import React from "react"
import { ScrollArea } from "../ui/scroll-area"
import { Input } from "../ui/input"
import { generatePresignedUrls } from "@/actions/generate_presigned_urls"
import ViewUploadedFiles from "../viewFiles/view-uploaded-files"

const UploadComplete = () => {

    const [fileSuccessUpload, setFileSuccessUpload] = useState(false);
    const { state, dispatch } = useContext(FileUploadContext);
    const { expiryDate, downloadLimit, isPasswordProtected, emails } = useFileUploadOptions();
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        const totalUploadedSizeMB = state.files.reduce((acc: number, file: { size: number }) => acc + (file.size / 1024 / 1024), 0)
        dispatch({ type: "SET_FILES", payload: 1024 - totalUploadedSizeMB });
    }, [state.files, dispatch]);

    const handleFileSelection = async () => {
        fileInputRef.current?.click();
    }

    const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            Array.from(files).forEach(file => {
                dispatch({ type: "ADD_FILE", payload: file });
            });
        }
    };

    const handleDeleteFile = (index: number) => {
        dispatch({ type: "DELETE_FILE", payload: index });
    }

    const handleUploadFiles = async () => {
        console.log("Expiry Date:", expiryDate);
        console.log("Download Limit:", downloadLimit);
        console.log("Password Protection:", isPasswordProtected ? "Enabled" : "Disabled");
        console.log("Files:", state.files);
        console.log("Emails:", emails);

        /***
         *  1. Create a preSigned URL as per array files
         *  2. Upload each file to a unique preSigned URL through POST API
         */

        const preSignedUrls = await generatePresignedUrls(state.files);
        console.log("preSignedUrls : ", preSignedUrls);

        preSignedUrls.forEach(async (element: any, index: number) => {
            console.log("element.url : ", element.url);
            console.log("element.fields : ", element.fields);

            const formData = new FormData();
            Object.keys(element.fields).forEach(key => {
                formData.append(key, element.fields[key]);
            });

            formData.append("file", state.files[index]);

            // Upload the file to S3 using the presigned POST data
            const uploadResponse = await fetch(element.url, {
                method: 'POST',
                body: formData
            });

            if (!uploadResponse.ok) {
                throw new Error('File upload failed');
            }

            console.log('File uploaded successfully');
            setFileSuccessUpload(true);

        });
    }

    return (
        <div className="flex basis-1/2 items-center justify-center">
            {
                fileSuccessUpload ? (
                    <ViewUploadedFiles />
                ) : (
                    <Card className="w-full max-w-lg mx-auto">
                        <ScrollArea className="h-[400px]">
                            <CardHeader>
                                <div className="flex flex-col">
                                    {state.files.slice(0, showMore ? state.files.length : 2).map((file: { name: string; size: number; type: string }, index: number) => (
                                        <div key={index} className="flex items-center justify-between mb-2">
                                            <div>
                                                <h6 className="text-xs font-semibold">{file.name}</h6>
                                                <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                            </div>
                                            <Button variant="ghost" size="icon" onClick={() => handleDeleteFile(index)}>
                                                <Image src="/trash_icon.svg" alt="Delete" width={24} height={24} />
                                            </Button>
                                        </div>
                                    ))}
                                    {state.files.length > 2 && (
                                        <Button variant="link" className="text-blue-500" onClick={() => setShowMore(!showMore)}>
                                            {showMore ? "Show Less" : `+${state.files.length - 2} More`}
                                        </Button>
                                    )}
                                </div>
                                <Input
                                    type="file"
                                    multiple
                                    ref={fileInputRef}
                                    onChange={handleFilesChange}
                                    style={{ display: 'none' }}
                                />
                                <Button variant="outline" size="lg" className="w-full" onClick={handleFileSelection}>
                                    <Image src="/plus_icon.svg" alt="Add" width={24} height={24} />
                                    Add More Files ( {state.remainingSpace.toFixed(2)} MB Remaining )
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FileUploadOptions />
                            </CardContent>
                        </ScrollArea>
                        <CardFooter>
                            <Button className="w-full" onClick={handleUploadFiles}>Upload Files</Button>
                        </CardFooter>
                    </Card>
                )
            }
        </div>
    )
}

export default UploadComplete;