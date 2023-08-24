import { UploadRes } from "../models/UploadRes";
import { ViewState } from "../types/ViewState";

type UseUploadToS3 = {
  setViewState: React.Dispatch<React.SetStateAction<ViewState>>;
  setUploadResponse: React.Dispatch<React.SetStateAction<UploadRes>>;
};

export const useUploadToS3 = ({
  setViewState,
  setUploadResponse,
}: UseUploadToS3) => {
  const url = import.meta.env.VITE_API_URL;

  const uploadToS3 = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    setViewState("uploading");
    try {
      const response = await fetch(`${url}`, {
        method: "POST",
        body: formData,
      });
      const data: UploadRes = await response.json();
      if (response.ok) {
        setViewState("uploaded");
        setUploadResponse(data);
        return;
      }
      setViewState("error");
      setUploadResponse(data);
    } catch {
      setUploadResponse({
        message: "Something went wrong. Please try again later.",
      });
      setViewState("error");
    }
  };

  return {
    uploadToS3,
  };
};
