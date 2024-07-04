import Link from "next/link"
import Image from "next/image"
import { Button } from "../ui/button";

export default function NavBar() {
    return (
        <div className="flex h-full bg-white">
            <div className="flex basis-1/2 items-center justify-between p-4 border-b-2">
                <div className="flex items-center space-x-4">
                    <Image src="/logo.svg" alt="File-Flare" width={64} height={64} />
                    <h1 className="text-xl font-bold">
                        The File <span className="text-emerald-500">Flare</span>
                    </h1>
                </div>
            </div>
            <div className="flex basis-1/2 items-center justify-end border-b-2">
                <div className="flex basis-1/2 items-center jusitfy-end space-x-6">
                    <Button variant="ghost" size="sm" className="text-black font-semibold">
                        <Image src="/grip.svg" alt="Upload" width={24} height={24} />
                    </Button>
                    <Link href="#" className="text-black font-semibold" prefetch={false}>
                        History
                    </Link>
                    {/* <div className="flex items-center space-x-2">
                        <span className="text-black font-semibold">Hi, Viral</span>
                        <Avatar>
                            <AvatarImage src="/placeholder-user.jpg" />
                            <AvatarFallback>VS</AvatarFallback>
                        </Avatar>
                    </div> */}
                    <div className="flex flex-items-center">
                        <Link href="/auth/signup" passHref>
                            <Button variant="login" size="lg">
                                Login
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}