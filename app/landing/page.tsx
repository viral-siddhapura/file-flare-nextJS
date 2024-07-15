import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";

export default function Landing() {
    return (
        <div className="flex flex-col min-h-[100dvh]">
            <header className="px-4 lg:px-6 h-14 flex items-center">
                <Link href="#" className="flex items-center justify-center" prefetch={false}>
                    <span className="text-xl font-bold">File-Flare</span>
                </Link>
                <nav className="ml-auto hidden lg:flex gap-4 sm:gap-6">
                    <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                        Features
                    </Link>
                    <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                        Pricing
                    </Link>
                    <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                        About
                    </Link>
                    <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                        Contact
                    </Link>
                </nav>
                <div className="ml-auto flex lg:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="rounded-full">
                                <Image
                                    src="/navbar-menu.svg"
                                    alt="Menu"
                                    width={24}
                                    height={24}
                                />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-full max-w-sm">
                            <nav className="grid gap-6 text-lg font-medium">
                                <Link
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                    prefetch={false}
                                >
                                    Features
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                    prefetch={false}
                                >
                                    Pricing
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                    prefetch={false}
                                >
                                    About
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                    prefetch={false}
                                >
                                    Contact
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </header>
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                        Secure File Sharing with File-Flare
                                    </h1>
                                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                        Easily share files with anyone, anywhere, with our cloud-based platform. Enjoy secure storage,
                                        real-time collaboration, and seamless communication.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                    <Link
                                        href="#"
                                        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                        prefetch={false}
                                    >
                                        Get Started
                                    </Link>
                                    <Link
                                        href="#"
                                        className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                        prefetch={false}
                                    >
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                            <img
                                src="/placeholder.svg"
                                width="550"
                                height="550"
                                alt="Hero"
                                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                            />
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                                    Secure, Collaborative, and Efficient
                                </h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    File-Flare offers a suite of features to streamline your file sharing and collaboration needs. From
                                    secure cloud storage to real-time chat, we've got you covered.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold">Secure Cloud Storage</h3>
                                    <p className="text-muted-foreground">
                                        Store your files securely in our cloud-based platform, with end-to-end encryption and robust access
                                        controls.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold">Personal Drive</h3>
                                    <p className="text-muted-foreground">
                                        Enjoy a personal drive to upload, organize, and share your files with ease. Collaborate with others
                                        in real time.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold">Secure Sharing</h3>
                                    <p className="text-muted-foreground">
                                        Share files securely with anyone, even outside your organization, with customizable access
                                        permissions.
                                    </p>
                                </div>
                            </div>
                            <img
                                src="/placeholder.svg"
                                width="550"
                                height="310"
                                alt="Features"
                                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                            />
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Personal Drive</div>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Manage Your Files with Ease</h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Leverage your personal drive to upload, organize, and collaborate on files with your team. Enjoy
                                    seamless integration and real-time updates.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                            <img
                                src="/placeholder.svg"
                                width="550"
                                height="310"
                                alt="Personal Drive"
                                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                            />
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold">Upload and Organize</h3>
                                    <p className="text-muted-foreground">
                                        Easily upload files to your personal drive and organize them into folders for better management.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold">Secure Sharing</h3>
                                    <p className="text-muted-foreground">
                                        Share files securely with your team, partners, or clients, and control access permissions.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold">Real-Time Collaboration</h3>
                                    <p className="text-muted-foreground">
                                        Collaborate on documents in real-time, with version history and commenting features.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Chat</div>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Seamless Communication</h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Stay connected with your team and clients through our real-time chat feature, built right into the
                                    platform.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold">Real-Time Messaging</h3>
                                    <p className="text-muted-foreground">
                                        Communicate with your team and clients in real-time, with instant message delivery and read
                                        receipts.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold">File Sharing</h3>
                                    <p className="text-muted-foreground">
                                        Share files directly within the chat, without the need to switch between apps.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold">Notifications</h3>
                                    <p className="text-muted-foreground">
                                        Stay up-to-date with real-time notifications for new messages, file updates, and more.
                                    </p>
                                </div>
                            </div>
                            <img
                                src="/placeholder.svg"
                                width="550"
                                height="310"
                                alt="Chat"
                                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                            />
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 border-t">
                    <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
                        <div className="space-y-3">
                            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                                Experience the Power of File-Flare
                            </h2>
                            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                Join the growing community of businesses and individuals who trust File-Flare for their secure file
                                sharing and collaboration needs.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                            <Link
                                href="#"
                                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                prefetch={false}
                            >
                                Start Free Trial
                            </Link>
                            <Link
                                href="#"
                                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                prefetch={false}
                            >
                                Contact Sales
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-muted-foreground">&copy; 2024 File-Flare. All rights reserved.</p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
                        Terms of Service
                    </Link>
                    <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
                        Privacy
                    </Link>
                </nav>
            </footer>
        </div>
    )
}