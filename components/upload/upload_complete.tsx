"use client"

import { useState } from "react"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import AddMoreFiles from "./add_more_files"
import FileUploadOptions from "./file_upload_options"

interface uploadComplete {
    files: File[];
}

const UploadComplete = ({ files = [] }: uploadComplete) => {

    return (
        <div className="flex basis-1/2 items-center justify-center">
            <Card className="w-full max-w-lg p-4">
                <CardHeader>
                    <div className="flex flex-col">
                        {files.map((file, index) => (
                            <div key={index} className="flex items-center justify-between mb-2">
                                <div>
                                    <h2 className="text-lg font-semibold">{file.name}</h2>
                                    <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                                <Button variant="ghost" size="icon">
                                    <TrashIcon />
                                </Button>
                            </div>
                        ))}
                    </div>
                    <AddMoreFiles />
                </CardHeader>
                <CardContent className="space-y-4">
                    <FileUploadOptions />
                </CardContent>
                <CardFooter>
                    <Button className="w-full">Upload Files</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

function TrashIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
    )
}

export default UploadComplete;