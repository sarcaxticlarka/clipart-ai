import { useState } from "react";
import { generateClipart } from "../services/GenerationService";
import { getSessionId } from "../services/SessionService";
import { saveToCache } from "../services/CacheService";
import { GenerationResult } from "../types";
import { StyleId } from "../constants/styles";

export const useGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<GenerationResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const startGeneration = async (styles: StyleId[], prompt: string, imageUri?: string) => {
    setIsGenerating(true);
    setError(null);
    try {
      const sessionId = await getSessionId();
      console.log(`Starting generation for styles: ${styles.join(", ")} at ${Date.now()}`);
      const generatedResults = await generateClipart(styles, prompt, sessionId, imageUri);
      console.log(`Generation success: ${generatedResults.length} images`);
      setResults(generatedResults);
      await saveToCache(generatedResults);
    } catch (err: any) {
      console.error("Generation error:", err.message);
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return { isGenerating, results, error, startGeneration };
};
