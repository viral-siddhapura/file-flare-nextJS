import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import UploadFile from "../upload/uploadFile"
import NavBarInformation from "./navbar_information"

export default function NavBar() {
    return (
        <div className="min-h-screen bg-white">
            <header className="flex items-center justify-between px-8 py-4 border-b">
                <div className="flex items-center space-x-4">
                    <Image src="/logo.svg" alt="File-Flare" width={64} height={64} />
                    <h1 className="text-xl font-bold">
                        The File <span className="text-emerald-600">Flare</span>
                    </h1>
                </div>
                <div className="flex items-center space-x-6">
                    {/* Put the Menu button in main - navabar page */}
                    <Link href="#" className="text-gray-600 hover:text-gray-900" prefetch={false}>
                        History
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
                <UploadFile />
                <NavBarInformation />
            </main>
        </div>
    )
}