import React, { useEffect } from "react";
import { Animated, Text, StyleSheet, View } from "react-native";
import { COLORS, BORDER_RADIUS, SPACING, SHADOWS } from "../../constants/theme";

interface ToastProps {
  message: string;
  visible: boolean;
  onHide: () => void;
  type?: "success" | "error" | "info";
}

export const Toast: React.FC<ToastProps> = ({ message, visible, onHide, type = "info" }) => {
  const opacity = new Animated.Value(0);

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(2000),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => onHide());
    }
  }, [visible]);

  if (!visible) return null;

  const getBackgroundColor = () => {
    switch (type) {
      case "success": return COLORS.success;
      case "error": return COLORS.error;
      default: return COLORS.accent;
    }
  };

  return (
    <Animated.View style={[styles.container, { opacity, backgroundColor: getBackgroundColor() }]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    ...SHADOWS.md,
    zIndex: 1000,
  },
  text: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "600",
  },
});
