import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Image from "next/image"

export default function UploadInformation() {
    return (
        <CardHeader>
            <div className="flex justify-center pb-4 md:pb-8">
                <Image
                    src="/upload.svg"
                    alt="Upload"
                    width={64}
                    height={64}
                    className="w-12 h-12 md:w-16 md:h-16"
                />
            </div>
            <CardTitle className="text-xl md:text-2xl mb-2">Drag and Drop Files Here</CardTitle>
            <CardDescription className="text-sm md:text-base">or click to select files</CardDescription>
        </CardHeader>
    )
}