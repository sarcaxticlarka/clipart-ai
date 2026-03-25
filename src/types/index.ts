import { StyleId } from "../constants/styles";

export interface GenerationResult {
  styleId: StyleId;
  url: string;
}

export interface UserSession {
  sessionId: string;
}

export interface GenerationState {
  isGenerating: boolean;
  results: GenerationResult[];
  error: string | null;
}
