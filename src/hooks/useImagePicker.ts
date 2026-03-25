import { useState } from "react";
import { pickImage } from "../services/ImagePickerService";

export const useImagePicker = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePick = async (useCamera: boolean) => {
    try {
      setError(null);
      const uri = await pickImage(useCamera);
      if (uri) setImageUri(uri);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return { imageUri, setImageUri, error, handlePick };
};
