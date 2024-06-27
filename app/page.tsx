import NavBarInformation from "@/components/navbar/navbar_information";
import UploadFile from "@/components/upload/upload-file";

export default function Home() {

  return (
    <main className="flex flex-row items-center justify-center py-40">
      <UploadFile />
      <NavBarInformation />
    </main>
  );
}
