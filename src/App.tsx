import { useState } from "react";
import "./App.css";
import { DragImage } from "./components/DragImage";
import { ViewState } from "./types/ViewState";
import { useUploadToS3 } from "./hooks/useUploadToS3";
import { UploadRes } from "./models/UploadRes";
import { Uploading } from "./components/Uploading";
import { Uploaded } from "./components/Uploaded";

function App() {
  const [viewState, setViewState] = useState<ViewState>("drag");
  const [uploadResponse, setUploadResponse] = useState<UploadRes>(
    {} as UploadRes
  );
  const { uploadToS3 } = useUploadToS3({
    setViewState,
    setUploadResponse,
  });

  const uploadImage = async (image: File) => {
    await uploadToS3(image);
    console.log(uploadResponse);
  };

  return (
    <>
      <main className="image-uploader">
        <div className="container">
          {(viewState === "drag" ||
            viewState === "error") && (
              <DragImage uploadImage={uploadImage} uploadRes={uploadResponse} />
            )}
          {viewState === "uploading" && <Uploading />}
          {viewState === "uploaded" && <Uploaded fileUrl={uploadResponse.fileUrl!} />}
        </div>
      </main>
      <footer>Footer</footer>
    </>
  );
}

export default App;
