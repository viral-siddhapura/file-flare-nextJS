import Image from "next/image"
import { Button } from "../ui/button"

export const Navabr = () => {
    return (
        <div className="flex flex-row p-5">
            <div className="flex basis-1/3 items-center justify-center">
                <div className="flex items-center p-5 space-x-10">
                    <Image
                        src="/logo.svg"
                        alt="logo"
                        width={82}
                        height={82}
                    />
                    <text className="text-lg font-bold">The File Lounge</text>
                    <Button
                        variant="link"
                        size={"icon"}
                    >
                        <Image
                            src="/menu.svg"
                            alt="search"
                            width={24}
                            height={24}
                        >
                        </Image>
                    </Button>
                </div>
            </div>
            {/* <div className="basis-1/3"></div> */}
            <div className="flex basis-2/3 items-center justify-end space-x-5">
                <text className="text-sm font-bold text-black">Hi, Viral</text>
                <div>
                    <Image
                        src="/down_arrow.svg"
                        alt="avatar"
                        width={24}
                        height={24}
                    >
                    </Image>
                </div>
                <Button variant="login">Login</Button>
                <Button variant="signUp">Sign Up</Button>
            </div>
        </div>
    )
}