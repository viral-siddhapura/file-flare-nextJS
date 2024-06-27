import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"

const EmailOption = () => {
    return (
        <div className="space-y-2">
            <Input placeholder="Email to" />
            <Textarea placeholder="Message (Optional)" className="min-h-[80px]" />
        </div>
    )
}

export default EmailOption;