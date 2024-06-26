"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import UploadInformation from "./upload_information"
import { useRef, useState, useTransition } from "react"
import { uploadFileAction } from "@/actions/upload_file";
import { Input } from "../ui/input";
import UploadComplete from "./upload_complete";
import { on } from "events";

const UploadFile = ({ onUploadComplete }: any) => {

    const [file, setFile] = useState<File | null>(null);
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleButtonClick = () => {

        if (fileInputRef.current) {
            fileInputRef.current.click();
        }

        if (!file) {
            console.log("No file selected");
            return;
        };

        startTransition(() => {
            startTransition(async () => {
                try {
                    setSuccess("success");
                    onUploadComplete();
                } catch (error) {
                    setError("Error uploading file. Please try again.");
                    setSuccess("");
                }
            });
        });
    };

    return (
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
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    <p className="mt-8 text-sm text-gray-500">max. 1 GB and 50 files</p>
                </CardContent>
            </Card>
        </div>
    )
}

export default UploadFile;