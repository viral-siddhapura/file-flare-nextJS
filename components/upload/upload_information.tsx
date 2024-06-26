import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function UploadInformation() {
    return (
        <CardHeader>
            <div className="flex justify-center pb-8">
                <Image
                    src="/upload.svg"
                    alt="Upload"
                    width={64}
                    height={64}
                />
            </div>
            <CardTitle>Drag and Drop Files Here</CardTitle>
            <CardDescription>or click to select files</CardDescription>
        </CardHeader>
    )
}