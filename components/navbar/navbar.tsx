import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import UploadFile from "../upload/uploadFile"

export default function NavBar() {
    return (
        <div className="min-h-screen bg-white">
            <header className="flex items-center justify-between px-8 py-4 border-b">
                <div className="flex items-center space-x-4">
                    <Image src="/logo.svg" alt="File-Flare" width={64} height={64} />
                    <h1 className="text-xl font-bold">
                        The File <span className="text-emerald-600">Room</span>
                    </h1>
                </div>
                <div className="flex items-center space-x-6">
                    {/* Put the Menu button in main - navabar page */}
                    <Link href="#" className="text-gray-600 hover:text-gray-900" prefetch={false}>
                        History
                    </Link>
                    <Link href="#" className="text-gray-600 hover:text-gray-900" prefetch={false}>
                        Discover TransferChain
                    </Link>
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-600">Hi, viralsid2330</span>
                        <Avatar>
                            <AvatarImage src="/placeholder-user.jpg" />
                            <AvatarFallback>VS</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </header>
            <main className="flex flex-row items-center justify-center py-40">
                <div className="flex flex-row basis-1/2 items-center justify-center">
                    <UploadFile />
                </div>
                <div className="flex flex-col basis-1/2 items-start">
                    <div className="flex mb-4 py-2 px-4 space-x-2 bg-white border-2 border-black rounded-full">
                        <Image
                            src="/lock.svg"
                            alt="Lock"
                            width={24}
                            height={24}
                        />
                        <span className="font-semibold">We Care About Your Privacy</span>
                    </div>
                    <h2 className="mt-4 text-4xl font-bold">
                        Send Files <span className="text-emerald-600">Securely</span>
                    </h2>
                    <p className="mt-4 text-gray-600">
                        No one can ever access your files that are sent through TransferChain
                        <br /> besides the intended recipients.
                    </p>
                    <div className="flex justify-center mt-8 space-x-8 md:justify-start">
                        <div className="flex flex-col items-center justify-center">
                            <Image
                                src="/network.svg"
                                alt="Network"
                                width={64}
                                height={64}
                            />
                            <p className="mt-2 text-sm font-semibold">Secure Network</p>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Image
                                src="/encryption.svg"
                                alt="Encryption"
                                width={64}
                                height={64}
                            />
                            <p className="mt-2 text-sm font-semibold">End-to-End Encryption</p>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Image
                                src="/cloud.svg"
                                alt="cloud"
                                width={64}
                                height={64}
                            />
                            <p className="mt-2 text-sm font-semibold">Distributed Multi-Cloud</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}