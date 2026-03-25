import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import { Platform, Alert } from "react-native";

export const downloadImage = async (url: string, filename: string) => {
  try {
    const fileUri = FileSystem.cacheDirectory + filename;
    const { uri } = await FileSystem.downloadAsync(url, fileUri);

    if (Platform.OS === "android") {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        const safUri = await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          filename,
          "image/png"
        );
        await FileSystem.writeAsStringAsync(safUri, base64, {
          encoding: FileSystem.EncodingType.Base64,
        });
        Alert.alert("Success", "Image saved to gallery");
      }
    } else {
      await Sharing.shareAsync(uri);
    }
  } catch (error) {
    console.error("Download error:", error);
    Alert.alert("Error", "Failed to download image");
  }
};

export const shareImage = async (url: string, filename: string) => {
  try {
    const fileUri = FileSystem.cacheDirectory + filename;
    const { uri } = await FileSystem.downloadAsync(url, fileUri);
    await Sharing.shareAsync(uri);
  } catch (error) {
    console.error("Share error:", error);
    Alert.alert("Error", "Failed to share image");
  }
};
