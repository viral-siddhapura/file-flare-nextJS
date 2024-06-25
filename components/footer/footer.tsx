import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import Link from "next/link"

export default function Footer() {
    return (
        <footer className="flex flex-col items-center justify-between px-8 py-4 border-t md:flex-row">
            <p className="text-sm text-gray-500">© 2024 TransferChain. Baar, Switzerland</p>
            <div className="flex items-center space-x-4">
                <Link href="#" className="text-sm text-gray-600 hover:text-gray-900" prefetch={false}>
                    Support
                </Link>
                <Link href="#" className="text-sm text-gray-600 hover:text-gray-900" prefetch={false}>
                    Terms of Service
                </Link>
                <Link href="#" className="text-sm text-gray-600 hover:text-gray-900" prefetch={false}>
                    Privacy Policy
                </Link>
                <Select>
                    <SelectTrigger id="language" aria-label="Select Language">
                        <SelectValue placeholder="English" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </footer>
    )
}