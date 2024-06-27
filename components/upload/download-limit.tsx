import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useFileUploadOptions } from "./file-upload-options-context";

const DownloadLimit = () => {

    const { downloadLimit, setDownloadLimit } = useFileUploadOptions();

    return (
        <div>
            <Label htmlFor="max-downloads">Max. number of downloads</Label>
            <Select value={downloadLimit} onValueChange={setDownloadLimit}>
                <SelectTrigger id="max-downloads">
                    <SelectValue placeholder="1" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="6">6</SelectItem>
                    <SelectItem value="7">7</SelectItem>
                    <SelectItem value="8">8</SelectItem>
                    <SelectItem value="9">9</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default DownloadLimit;