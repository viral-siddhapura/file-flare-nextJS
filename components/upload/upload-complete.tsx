"use client"

import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import FileUploadOptions from "./file-upload-options"
import { useEffect, useState } from "react"

interface uploadComplete {
    files: File[];
    onAddFiles: (newFile: File) => void;
    onDeleteFile: (index: number) => void;
}

const UploadComplete = ({ files, onAddFiles, onDeleteFile }: uploadComplete) => {

    console.log(files.length);

    const totalSpace = 1024;
    const [remainingSpace, setRemainingSpace] = useState<number>(totalSpace);

    useEffect( () => {
        const totalUploadedSizeMB = files.reduce((acc, file) => acc + (file.size / 1024 / 1024), 0)
        console.log(totalUploadedSizeMB);
        setRemainingSpace(totalSpace - totalUploadedSizeMB);
    }, [files]);

    const handleFileSelection = async () => {
        console.log("button clicked!!");
        try {
            const [newFile] = await (window as any).showOpenFilePicker();
            const file = await newFile.getFile();
            onAddFiles(file);
        } catch (error) {
            if (error === 'AbortError') {
                // Handle the case where the user aborts the file selection
                console.log('File selection was aborted by the user.');
            } else {
                // Handle other errors
                console.error('An error occurred:', error);
            }
        }
    }

    const handleDeleteFile = (index: number) => {
        const fileSizeMb = files[index].size / 1024 / 1024;
        onDeleteFile(index);
        setRemainingSpace(prevSpace => prevSpace + fileSizeMb);
    }

    return (
        <div className="flex basis-1/2 items-center justify-center">
            <Card className="w-full max-w-xl">
                <CardHeader>
                    <div className="flex flex-col overflow-y-auto" style={{ maxHeight: '100px' }}>
                        {files.map((file, index) => (
                            <div key={index} className="flex items-center justify-between mb-2">
                                <div>
                                    <h6 className="text-xs font-semibold">{file.name}</h6>
                                    <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => handleDeleteFile(index)}>
                                    <Image
                                        src="/trash_icon.svg"
                                        alt="Delete"
                                        width={24}
                                        height={24}
                                    />
                                </Button>
                            </div>
                        ))}
                    </div>
                    <Button variant="outline" size="lg" className="w-full" onClick={handleFileSelection}>
                        <Image
                            src="/plus_icon.svg"
                            alt="Add"
                            width={24}
                            height={24}
                        />
                        Add More Files ( {remainingSpace.toFixed(2)} Remaining )
                    </Button>
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

export default UploadComplete;