import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, BORDER_RADIUS, SPACING, SHADOWS } from "../../constants/theme";
import { ClipartStyle } from "../../constants/styles";

interface StyleCardProps {
  style: ClipartStyle;
  selected: boolean;
  onSelect: (id: string) => void;
}

export const StyleCard: React.FC<StyleCardProps> = ({ style, selected, onSelect }) => {
  const IconComponent = style.icon;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        selected && styles.selectedContainer,
        selected && { borderColor: style.gradient[0] },
      ]}
      onPress={() => onSelect(style.id)}
      activeOpacity={0.7}
    >
      {/* Gradient accent strip at top */}
      <LinearGradient
        colors={[...style.gradient]}
        style={styles.accentStrip}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />

      {/* Icon in a gradient circle */}
      <View style={[styles.iconCircle, { backgroundColor: style.gradient[0] + "20" }]}>
        <IconComponent color={style.gradient[0]} size={22} />
      </View>

      {/* Labels */}
      <Text style={[styles.label, selected && { color: style.gradient[0] }]}>
        {style.label}
      </Text>
      <Text style={styles.description}>{style.description}</Text>

      {/* Selected indicator */}
      {selected && (
        <View style={[styles.checkBadge, { backgroundColor: style.gradient[0] }]}>
          <Text style={styles.checkText}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "48%",
    marginBottom: SPACING.md,
    backgroundColor: COLORS.glass,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1.5,
    borderColor: COLORS.glassBorder,
    overflow: "hidden",
    position: "relative",
  },
  selectedContainer: {
    backgroundColor: COLORS.glassHeavy,
    ...SHADOWS.sm,
  },
  accentStrip: {
    height: 3,
    borderRadius: 2,
    marginBottom: SPACING.md,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  label: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.onSurface,
    marginBottom: 3,
  },
  description: {
    fontSize: 11,
    color: COLORS.muted,
    lineHeight: 15,
  },
  checkBadge: {
    position: "absolute",
    top: SPACING.sm,
    right: SPACING.sm,
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
  },
  checkText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
});
