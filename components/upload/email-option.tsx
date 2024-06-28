import { useRef, useState } from "react";
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Badge } from "../ui/badge";
import { CopyIcon, XIcon } from "lucide-react";
import { useFileUploadOptions } from "./file-upload-options-context";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const EmailOption = () => {

    const { emails, setEmails } = useFileUploadOptions();
    const [inputValue, setInputValue] = useState<string>("");
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue !== "") {
            setEmails([...emails, inputValue]);
            setInputValue("");
        }
    }

    const handleCopyClick = () => {
        if (passwordRef.current) {
            const passwordValue = passwordRef.current.value;
            navigator.clipboard.writeText(passwordValue)
                .then(() => {
                    console.log('Password copied to clipboard');
                })
                .catch((err) => {
                    console.error('Failed to copy password: ', err);
                });
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
                {
                    emails.length > 0 && (
                        <div className="space-y-2 p-4 border-2 rounded-md">
                            <p className="text-sm text-muted-foreground">
                                Recipient(s) need the password below to access the file(s). Without the password, no one can retrieve your
                                files.
                            </p>
                            <div className="flex items-center space-x-2">
                                <Label htmlFor="password" className="text-sm font-medium">
                                    Password
                                </Label>
                                <Input id="password" ref={passwordRef} value="CF3DA1" readOnly />
                                <Button variant="outline" size="icon" className="ml-auto" onClick={handleCopyClick} >
                                    <CopyIcon className="w-4 h-4"/>
                                </Button>
                            </div>
                        </div>
                    )
                }
                <Textarea placeholder="Message (Optional)" className="min-h-[100px]"/>
            </div>
        </div>
    )
}

export default EmailOption;