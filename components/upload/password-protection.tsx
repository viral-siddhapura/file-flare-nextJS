import { useState } from "react";
import { Label } from "../ui/label"
import { Switch } from "../ui/switch"
import { useFileUploadOptions } from "./file-upload-options-context";

const PasswordProtection = () => {

    const { isPasswordProtected, setIsPasswordProtected } = useFileUploadOptions();
    
    return (
        <div>
            <div className="border-2 rounded-md border-slate-300 p-2">
                <div className="flex items-center space-x-2 justify-between">
                    <Label htmlFor="password-protection">Password protection</Label>
                    <Switch
                        id="password-protection"
                        checked={isPasswordProtected}
                        onCheckedChange={setIsPasswordProtected}
                    />
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                    When enabled, the password will be visible to you after your <br /> files are uploaded and the link is
                    generated.
                </p>
            </div>
        </div>
    )
}

export default PasswordProtection;