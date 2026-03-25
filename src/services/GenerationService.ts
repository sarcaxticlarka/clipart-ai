import axios from "axios";
import * as FileSystem from "expo-file-system/legacy";
import { CONFIG } from "../constants/config";
import { GenerationResult } from "../types";
import { StyleId } from "../constants/styles";

export const generateClipart = async (
  styles: StyleId[],
  description: string,
  sessionId: string,
  imageUri?: string
): Promise<GenerationResult[]> => {
  try {
    // Read the uploaded image as base64
    let imageBase64: string | undefined;
    if (imageUri) {
      console.log("Reading image as base64...");
      imageBase64 = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      console.log(`Image encoded: ${(imageBase64.length / 1024).toFixed(0)}KB`);
    }

    const response = await axios.post(
      `${CONFIG.API_URL}/generate`,
      {
        styles,
        description,
        sourceImage: imageBase64,
      },
      {
        headers: {
          "x-session-id": sessionId,
        },
        timeout: 120000, // 2 min timeout for img2img
      }
    );
    return response.data.results;
  } catch (error: any) {
    console.error("Generation API error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Failed to generate clipart");
  }
};
