import { LucideIcon, Clapperboard, Palette, Zap, Gamepad2, PenTool } from "lucide-react-native";

export type StyleId = "cartoon" | "flat-illustration" | "anime" | "pixel-art" | "sketch";

export interface ClipartStyle {
  id: StyleId;
  label: string;
  description: string;
  icon: LucideIcon;
  gradient: readonly [string, string];
}

export const GENERATION_STYLES: ClipartStyle[] = [
  {
    id: "cartoon",
    label: "3D Cartoon",
    description: "Vibrant and smooth Pixar-style 3D",
    icon: Clapperboard,
    gradient: ["#FF6B35", "#FF9F1C"],
  },
  {
    id: "flat-illustration",
    label: "Flat Illustration",
    description: "Modern minimalist vector design",
    icon: Palette,
    gradient: ["#00D4AA", "#00B894"],
  },
  {
    id: "anime",
    label: "Anime",
    description: "High-quality modern anime art",
    icon: Zap,
    gradient: ["#A855F7", "#7C3AED"],
  },
  {
    id: "pixel-art",
    label: "Pixel Art",
    description: "Detailed 32-bit retro pixel style",
    icon: Gamepad2,
    gradient: ["#F472B6", "#EC4899"],
  },
  {
    id: "sketch",
    label: "Sketch",
    description: "Professional graphite & charcoal sketch",
    icon: PenTool,
    gradient: ["#94A3B8", "#64748B"],
  },
];
