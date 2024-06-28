import { useState } from "react";
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Badge } from "../ui/badge";
import { DoorClosedIcon, XIcon } from "lucide-react";
import { useFileUploadOptions } from "./file-upload-options-context";

const EmailOption = () => {

    const { emails, setEmails } = useFileUploadOptions();
    const [inputValue, setInputValue] = useState<string>("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue !== "") {
            setEmails([...emails, inputValue]);
            setInputValue("");
        }
    }

    return (
        <div className="space-y-2">
            <div className="flex flex-wrap gap-2 p-2 border rounded-md">
                {emails.map((email, index) => (
                    <Badge key={index} variant="email" className="flex items-center">
                        {email}
                        <XIcon
                            className="w-4 h-4 ml-2 cursor-pointer"
                            onClick={() => setEmails(emails.filter((_, i) => i !== index))}
                        />
                    </Badge>
                ))}
                <Input
                    id="email"
                    type="email"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter email address(s)"
                    className="flex-1 border"
                />
                <Textarea placeholder="Message (Optional)" className="min-h-[80px]" />
            </div>
        </div>
    )
}

export default EmailOption;