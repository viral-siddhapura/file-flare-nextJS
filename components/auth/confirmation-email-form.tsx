"use client";

import { CardHeader, CardTitle, CardFooter, Card, CardContent } from "../ui/card"
import { useState, useEffect } from "react"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp"
import { MailCheckIcon } from "lucide-react"
import { Button } from "../ui/button"

export const ConfirmationEmailForm = () => {

    const [otpValue, setOTPValue] = useState<string>("");
    const [countdown, setCountdown] = useState<number>(180);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown === 0) {
                    clearInterval(timer)
                    return 0
                }
                return prevCountdown - 1
            })
        }, 1000)
        return () => clearInterval(timer)
    }, [countdown === 180]);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = time % 60
        return `${minutes}:${seconds.toString().padStart(2, "0")}`
    }

    const onRequestAgain = () => {
        setCountdown(180)
    }

    const onVerifyAccount = () => {
        console.log("Verifying account...")
    }

    return (
        <Card className="w-[600px] shadow-lg">
            <CardHeader className="flex flex-col items-center text-center">
                <MailCheckIcon className="w-16 h-16" />
                <CardTitle className="text-2xl font-semibold">Authenticate Your Account</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-center items-center mt-4">
                <InputOTP
                    maxLength={6}
                    value={otpValue}
                    onChange={(value) => setOTPValue(value)}
                >
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>
                <div className="text-center text-sm">
                    {otpValue === "" ? (
                        <p className="mt-4">Enter your one-time password.</p>
                    ) : (
                        <p className="mt-4">You entered: {otpValue}</p>
                    )}
                </div>
            </CardContent>
            <CardFooter className="flex flex-col items-center justify-between">
                {
                    countdown === 0 ? (
                        <div className="text-red-500 mt-4">Time has expired. Please request a new code.</div>
                    ) : (
                        null
                    )
                }
                {
                    countdown > 0 && <div className="text-md text-black text-center font-semibold">{formatTime(countdown)}</div>
                }
                {
                    countdown === 0 && (
                        <div>
                            <span>Didn't receive a code?</span>
                            <Button
                                variant={"link"}
                                className="text-blue-600 text-md"
                                onClick={onRequestAgain}
                            >
                                Request again
                            </Button>
                        </div>
                    )
                }
                <Button
                    variant="default"
                    disabled={otpValue.length !== 6 || countdown === 0}
                    className="w-full mt-5"
                    onClick={onVerifyAccount}
                >
                    Verify Account
                </Button>
            </CardFooter>
        </Card>
    )
}