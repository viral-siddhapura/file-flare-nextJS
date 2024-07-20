import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select";
import { WebcamIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export default function ContactUsForm() {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen p-4 bg-white md:p-10">
            <div className="w-full max-w-4xl p-6 space-y-8 bg-white border rounded-lg shadow-md md:p-10">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-black">Contact Us</h2>
                    <p className="text-muted-foreground">
                        Couldn&apos;t find an answer in the Support Center or FAQ? Please submit your question through the contact form
                        and our team will be in touch with you shortly.
                    </p>
                </div>
                <form className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="contact-email">Contact Email</Label>
                        <Input id="contact-email" placeholder="Contact Email" type="email" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="device">Which device are you having problems with?</Label>
                        <Select>
                            <SelectTrigger id="device" aria-label="Device">
                                <SelectValue placeholder="Select device" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="device1">Device 1</SelectItem>
                                <SelectItem value="device2">Device 2</SelectItem>
                                <SelectItem value="device3">Device 3</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" placeholder="Subject" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="inquiry">Describe your inquiry</Label>
                        <Textarea id="inquiry" placeholder="Describe your inquiry" className="min-h-[100px]" />
                    </div>
                    {/* <div className="flex items-center space-x-2">
                        <Checkbox id="human" />
                        <label
                            htmlFor="human"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            I am human
                        </label>
                        <div className="ml-auto">
                            <img src="/placeholder.svg" alt="hCaptcha" className="h-12" />
                        </div>
                    </div> */}
                    <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">Send</Button>
                </form>
                <p className="text-xs text-muted-foreground">
                    By providing your email you agree to{" "}
                    <a href="#" className="underline">
                        terms of service
                    </a>{" "}
                    &{" "}
                    <a href="#" className="underline">
                        privacy
                    </a>
                </p>
            </div>
            <Button
                variant="ghost"
                size="icon"
                className="fixed bottom-4 right-4 rounded-full bg-blue-600 text-white hover:bg-blue-700"
            >
                <WebcamIcon className="w-6 h-6" />
            </Button>
        </div>
    )
}