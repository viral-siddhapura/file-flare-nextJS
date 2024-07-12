import { LockIcon } from "lucide-react";
import Image from "next/image";

export default function LoginNavBar() {
    return (
        <div className="w-full bg-white">
            <header className="flex flex-col items-center justify-between p-4 sm:flex-row border-b-2">
                <div className="flex items-center mb-2 sm:mb-0">
                    <Image 
                        src="/logo.svg"
                        alt="FileFlare logo"
                        width={64}
                        height={64}
                    />
                    <h1 className="text-xl font-bold">The File Flare</h1>
                </div>
            </header>
        </div>
    )
}