import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import ExpirtyDate from "./expiry-date"
import DownloadLimit from "./download-limit"
import EmailOption from "./email-option"
import PasswordProtection from "./password-protection"

const FileUploadOptions = () => {

    const [selectedOption, setSelectedOption] = useState("get-link");

    return (
        <>
            <RadioGroup defaultValue="get-link" value={selectedOption} onValueChange={(value) => setSelectedOption(value)}>
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="get-link" id="get-link" />
                        <Label htmlFor="get-link">Get transfer link</Label>
                    </div>
                    <div className="space-y-2 mt-4">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="send-email" id="send-email" />
                            <Label htmlFor="send-email">Send with email</Label>
                        </div>
                    </div>
                    {
                        selectedOption === "get-link" ? (
                            <PasswordProtection />
                        ) : (
                            <EmailOption />
                        )
                    }
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <ExpirtyDate />
                        <DownloadLimit />
                    </div>
                </div>
            </RadioGroup>
        </>
    )
}

export default FileUploadOptions;