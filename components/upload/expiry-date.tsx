import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

const ExpirtyDate = () => {
    return (
        <div>
            <Label htmlFor="expiration-date">Expiration Date</Label>
            <Select>
                <SelectTrigger id="expiration-date">
                    <SelectValue placeholder="7 day" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1 day">1 day</SelectItem>
                    <SelectItem value="7 day">7 day</SelectItem>
                    <SelectItem value="30 day">30 day</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default ExpirtyDate;