export const COLORS = {
  // Core palette — warm amber/orange inspired
  primary: "#FF6B35",
  primaryDark: "#E85D2C",
  accent: "#FF9F1C",
  secondary: "#00D4AA",
  secondaryDark: "#00B894",

  // Backgrounds
  background: "#0A0A0F",
  backgroundDark: "#050508",
  surface: "rgba(255,255,255,0.06)",
  surfaceLight: "rgba(255,255,255,0.10)",
  surfaceBorder: "rgba(255,255,255,0.12)",

  // Text
  onPrimary: "#FFFFFF",
  onSecondary: "#000000",
  onBackground: "#FFFFFF",
  onSurface: "#F0F0F0",
  muted: "#8A8A9A",
  mutedLight: "#B0B0C0",

  // Status
  error: "#FF4757",
  success: "#2ED573",

  // Glass
  glass: "rgba(255,255,255,0.08)",
  glassBorder: "rgba(255,255,255,0.15)",
  glassHeavy: "rgba(255,255,255,0.14)",

  // Dark CTA bar
  ctaBar: "#1A1A24",
  ctaBarBorder: "rgba(255,255,255,0.08)",
};

export const GRADIENTS = {
  warmScreen: ["#0A0A0F", "#1A0800", "#2D1000", "#0A0A0F"] as const,
  coolScreen: ["#0A0A0F", "#000D1A", "#001A33", "#0A0A0F"] as const,
  resultScreen: ["#0A0A0F", "#0D0A1A", "#1A0D2D", "#0A0A0F"] as const,
  primaryButton: ["#FF6B35", "#FF9F1C"] as const,
  secondaryButton: ["#00D4AA", "#00B894"] as const,
  card: ["rgba(255,255,255,0.08)", "rgba(255,255,255,0.03)"] as const,
  shimmer: ["rgba(255,255,255,0.03)", "rgba(255,255,255,0.12)", "rgba(255,255,255,0.03)"] as const,
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 20,
  xl: 28,
  full: 100,
};

export const TYPOGRAPHY = {
  hero: {
    fontSize: 36,
    fontWeight: "800" as const,
    letterSpacing: -1,
    lineHeight: 42,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700" as const,
    letterSpacing: -0.5,
  },
  subheading: {
    fontSize: 18,
    fontWeight: "600" as const,
  },
  body: {
    fontSize: 16,
    fontWeight: "400" as const,
  },
  caption: {
    fontSize: 13,
    fontWeight: "500" as const,
  },
  cta: {
    fontSize: 28,
    fontWeight: "800" as const,
    letterSpacing: -0.5,
  },
};

export const SHADOWS = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  glow: {
    shadowColor: "#FF6B35",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
};
