import * as ImagePicker from "expo-image-picker";
import { CONFIG } from "../constants/config";

export const pickImage = async (useCamera: boolean = false) => {
  const permissionResult = useCamera
    ? await ImagePicker.requestCameraPermissionsAsync()
    : await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted === false) {
    throw new Error(`Permission to access ${useCamera ? "camera" : "gallery"} was denied`);
  }

  const result = useCamera
    ? await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      })
    : await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

  if (!result.canceled) {
    const asset = result.assets[0];
    if (asset.fileSize && asset.fileSize > CONFIG.MAX_IMAGE_SIZE) {
      throw new Error("Image size exceeds 5MB limit");
    }
    return asset.uri;
  }
  return null;
};
