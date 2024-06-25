import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const UploadFile = () => {
    return (
        <Card className="w-full max-w-md p-8 text-center">
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
            <CardContent>
                <Button variant="default" className="w-full mt-8">
                    Select File(s)
                </Button>
                <p className="mt-8 text-sm text-gray-500">max. 1 GB and 50 files</p>
            </CardContent>
        </Card>
    )
}

export default UploadFile;