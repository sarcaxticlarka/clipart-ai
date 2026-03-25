import { useState } from "react";
import { downloadImage, shareImage } from "../services/DownloadService";
import { CONFIG } from "../constants/config";

export const useDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const getFullUrl = (url: string) => url.startsWith("/") ? `${CONFIG.API_URL}${url}` : url;

  const handleDownload = async (url: string, filename: string) => {
    setIsDownloading(true);
    await downloadImage(getFullUrl(url), filename);
    setIsDownloading(false);
  };

  const handleShare = async (url: string, filename: string) => {
    await shareImage(getFullUrl(url), filename);
  };

  return { isDownloading, handleDownload, handleShare };
};
