import AsyncStorage from "@react-native-async-storage/async-storage";
import { GenerationResult } from "../types";

const CACHE_KEY = "clipart_generation_cache";
const MAX_ENTRIES = 20;

export const saveToCache = async (results: GenerationResult[]) => {
  try {
    const existing = await getCache();
    const updated = [...results, ...existing].slice(0, MAX_ENTRIES);
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Cache save error:", error);
  }
};

export const getCache = async (): Promise<GenerationResult[]> => {
  try {
    const data = await AsyncStorage.getItem(CACHE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Cache get error:", error);
    return [];
  }
};
