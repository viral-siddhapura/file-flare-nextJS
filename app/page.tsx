import NavBarInformation from "@/components/navbar/navbar_information";
import UploadFile from "@/components/upload/uploadFile";
import UploadComplete from "@/components/upload/upload_complete";
import { useState } from "react";

export default function Home() {

  return (
    <main className="flex flex-row items-center justify-center py-40">
      <UploadFile />
      <NavBarInformation />
    </main>
  );
}
