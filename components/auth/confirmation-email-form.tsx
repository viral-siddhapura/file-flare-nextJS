import { MailCheckIcon, LockIcon, Link } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card"
import { Input } from "../ui/input"
import { useState, useEffect } from "react"

export const ConfirmationEmailForm = () => {

    const [countdown, setCountdown] = useState<number>(10);
    const [error, setError] = useState(false)

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown === 0) {
                    setError(true)
                    clearInterval(timer)
                    return 0
                }
                return prevCountdown - 1
            })
        }, 1000)
        return () => clearInterval(timer)
    }, []);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = time % 60
        return `${minutes}:${seconds.toString().padStart(2, "0")}`
    }

    return (
        <div>
            <Card className="w-[600px] shadow-lg">
                <CardHeader className="flex flex-col items-center text-center">
                    <MailCheckIcon className="w-16 h-16" />
                    <CardTitle className="text-2xl font-semibold">Authenticate Your Account</CardTitle>
                    <CardDescription className="text-gray-500">An email with a 6 digit verification code has been sent to your email.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-start mt-5">
                    <div className="relative flex items-center w-full">
                        <Input type="text" placeholder="Verification Code" className="flex-1 pr-10" />
                        <LockIcon className="absolute w-5 h-5 text-gray-500 right-2" />
                    </div>
                    {
                        countdown === 0 && <div className="text-red-500">Time expired. Please request a new code.</div>
                    }
                </CardContent>
                <CardFooter className="flex flex-col items-center justify-between">
                    {
                        countdown > 0 && <div className="text-xl text-black text-center font-semibold">{formatTime(countdown)}</div>
                    }
                    {
                        countdown === 0 && <div>
                            <span>Didn't receive a code? </span>
                            <Link href="#" className="text-blue-600 hover:underline">
                                Request again
                            </Link>
                        </div>
                    }
                    <Button
                        variant="default"
                        disabled={true}
                        className="w-full mt-5"
                    >
                        Verify Account
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}