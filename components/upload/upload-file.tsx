"use client";

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import UploadInformation from "./upload-information"
import { useContext, useRef, useState, useTransition } from "react"
import { uploadFileAction } from "@/actions/upload_file";
import { Input } from "../ui/input";
import UploadComplete from "./upload-complete";
import { FileUploadContext } from "./file-upload-context";
import { FileUploadOptionsProvider } from "./file-upload-options-context";

const UploadFile = () => {

    /**
     *   1. use Reeducer and Context API to manage file upload state
     * */

    const { state, dispatch } = useContext(FileUploadContext);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            dispatch({ type: "SET_FILES", payload: Array.from(e.target.files) });
        }
    };

    const handleButtonClick = async () => {

        if (fileInputRef.current) {
            fileInputRef.current.click();
        }

        if (!state.files) {
            console.log("No file selected");
            return;
        };
    };

    return (
        <div className="flex basis-1/2 items-center justify-center">
            {
                state.files.length === 0 ? (
                    <Card className="w-full max-w-lg mx-auto p-4 md:p-8 text-center">
                        <UploadInformation />
                        <CardContent>
                            <Button
                                variant="default"
                                className="w-full mt-4 md:mt-8"
                                onClick={handleButtonClick}
                            >
                                Select File(s)
                            </Button>
                            <Input
                                type="file"
                                multiple
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                            <p className="mt-4 md:mt-8 text-sm text-gray-500">You can upload upto 1 GB for free</p>
                        </CardContent>
                    </Card>
                ) : (
                    <FileUploadOptionsProvider >
                        <UploadComplete />
                    </FileUploadOptionsProvider>
                )
            }
        </div>
    )
}

export default UploadFile;