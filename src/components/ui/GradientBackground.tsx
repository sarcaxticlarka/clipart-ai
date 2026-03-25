import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { GRADIENTS } from "../../constants/theme";

interface GradientBackgroundProps {
  variant?: "warm" | "cool" | "result";
  children: React.ReactNode;
}

const gradientMap = {
  warm: GRADIENTS.warmScreen,
  cool: GRADIENTS.coolScreen,
  result: GRADIENTS.resultScreen,
};

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  variant = "warm",
  children,
}) => {
  return (
    <LinearGradient
      colors={[...gradientMap[variant]]}
      style={styles.container}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
