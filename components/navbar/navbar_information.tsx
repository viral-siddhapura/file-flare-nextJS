import Image from "next/image"

export default function NavBarInformation() {
    return (
        <div className="flex flex-col basis-1/2 items-start">
            <div className="flex mb-4 py-2 px-4 space-x-2 text-black bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 rounded-full">
                <Image
                    src="/lock.svg"
                    alt="Lock"
                    width={24}
                    height={24}
                />
                <span className="font-semibold">We Care About Your Privacy</span>
            </div>
            <h2 className="mt-4 text-4xl font-bold">
                Send Files <span className="text-emerald-500">Securely</span>
            </h2>
            <p className="mt-4 text-gray-600">
                No one can ever access your files that are sent through TransferChain
                <br /> besides the intended recipients.
            </p>
            <div className="flex justify-center mt-8 space-x-14 md:justify-start">
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
                    <p className="mt-2 text-sm font-semibold">Cloud based storage</p>
                </div>
            </div>
        </div>
    )
}