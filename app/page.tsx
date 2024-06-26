import NavBarInformation from "@/components/navbar/navbar_information";
import UploadFile from "@/components/upload/uploadFile";
import UploadComplete from "@/components/upload/upload_complete";
import { useState } from "react";

export default function Home() {

  const [uploadComplete, setUploadComplete] = useState(false);

  const handleUploadComplete = () => {
    setUploadComplete(true);
  };

  return (
    <main className="flex flex-row items-center justify-center py-40">
      {
        uploadComplete ? (
          <UploadComplete />
        ) : (
          <UploadFile onUploadComplete={handleUploadComplete} />
        )
      }
      <NavBarInformation />
    </main>
  );
}
