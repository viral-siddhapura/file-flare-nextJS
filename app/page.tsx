import NavBar from "@/components/navbar/navbar";
import NavBarInformation from "@/components/navbar/navbar_information";
import { FileUploadProvider } from "@/components/upload/file-upload-context";
import UploadFile from "@/components/upload/upload-file";
import Landing from "./landing/page";

export default function Home() {
  return (
    <FileUploadProvider>
      <NavBar />
      <main className="flex flex-row items-center justify-center py-40">
        <UploadFile />
        <NavBarInformation />
      </main>
    </FileUploadProvider>
  );
}
