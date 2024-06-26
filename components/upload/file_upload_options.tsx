import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useState } from "react"

const FileUploadOptions = () => {

    const [isPasswordProtected, setIsPasswordProtected] = useState(false)

    return (
        <RadioGroup defaultValue="get-link">
            <div className="space-y-2">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="get-link" id="get-link" />
                    <Label htmlFor="get-link">Get transfer link</Label>
                </div>
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
                            When enabled, the password will be visible to you <br /> after your files are uploaded and the link is
                            generated.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <Label htmlFor="expiration-date">Expiration Date</Label>
                            <Select>
                                <SelectTrigger id="expiration-date">
                                    <SelectValue placeholder="7 day" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1 day">1 day</SelectItem>
                                    <SelectItem value="7 day">7 day</SelectItem>
                                    <SelectItem value="30 day">30 day</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="max-downloads">Max. number of downloads</Label>
                            <Select>
                                <SelectTrigger id="max-downloads">
                                    <SelectValue placeholder="10" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">1</SelectItem>
                                    <SelectItem value="5">5</SelectItem>
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="20">20</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="space-y-2 mt-4">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="send-email" id="send-email" />
                    <Label htmlFor="send-email">Send with email</Label>
                </div>
            </div>
        </RadioGroup>
    )
}

export default FileUploadOptions;