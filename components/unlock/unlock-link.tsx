import { EyeOffIcon, InfoIcon, LockIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const UnlockLink = () => {
    return (
        <div className="flex flex-col items-center justify-center bg-white py-40">
            <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center justify-center w-32 h-32 border-2 shadow-md rounded-full">
                    <Image
                        src="/lock.svg"
                        alt="Lock"
                        width={64}
                        height={64}
                    />
                </div>
                <h2 className="text-4xl font-bold text-center">This Link is password protected</h2>
                <p className="text-center text-sm text-muted-foreground">
                    You need to ask the sender for the password to unlock and access files <span />
                    <InfoIcon className="inline-block w-4 h-4 text-muted-foreground" />
                </p>
            </div>
            <div className="p-2">
                <div className="relative">
                    <Input type="password" placeholder="Password" className="w-full" />
                    <EyeOffIcon className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                </div>
                <Button className="w-full bg-blue-500 text-white mt-4">Unlock</Button>
            </div>
        </div>
    );
}

export default UnlockLink;