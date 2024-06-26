"use client"

import { useState } from "react"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

export default function UploadComplete() {

    const [isPasswordProtected, setIsPasswordProtected] = useState(false)

    return (
        <div className="flex basis-1/2 items-center justify-center">
            <Card className="w-full max-w-lg p-4">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold">Viral_Siddhapura_Resume.pdf</h2>
                            <p className="text-sm text-muted-foreground">70.7KB</p>
                        </div>
                        <Button variant="ghost" size="icon">
                            <TrashIcon />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full">
                        <PlusIcon />
                        Add More Files ( Add space logic here )
                    </Button>
                    <RadioGroup defaultValue="get-link">
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="get-link" id="get-link" />
                                <Label htmlFor="get-link">Get transfer link</Label>
                            </div>
                            <div>
                                <div className="border-2 rounded-md border-gray-300 p-2">
                                    <div className="flex items-center space-x-2 justify-between">
                                        <Label htmlFor="password-protection">Password protection</Label>
                                        <Switch
                                            id="password-protection"
                                            checked={isPasswordProtected}
                                            onCheckedChange={setIsPasswordProtected}
                                        />
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-4">
                                        When enabled, the password will be visible to you <br/> after your files are uploaded and the link is
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
                </CardContent>
                <CardFooter>
                    <Button className="w-full">Upload Files</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

function PlusIcon() {
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
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
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