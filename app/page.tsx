import NavBar from "@/components/navbar/navbar";
import NavBarInformation from "@/components/navbar/navbar_information";
import { FileUploadProvider } from "@/components/upload/file-upload-context";
import UploadFile from "@/components/upload/upload-file";

export default function Home() {
  return (
    <FileUploadProvider>
      {/* <Landing /> */}
      <NavBar />
      <main className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center p-4">
        <UploadFile />
        {/* <NavBarInformation /> */}
      </main>
    </FileUploadProvider>
  );
}
