import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

const DownloadLimit = () => {
    return (
        <div>
            <Label htmlFor="max-downloads">Max. number of downloads</Label>
            <Select>
                <SelectTrigger id="max-downloads">
                    <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default DownloadLimit;