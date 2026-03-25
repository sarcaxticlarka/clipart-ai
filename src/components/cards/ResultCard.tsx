import React from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Download, Share2 } from "lucide-react-native";
import { COLORS, BORDER_RADIUS, SPACING, SHADOWS } from "../../constants/theme";
import { CONFIG } from "../../constants/config";
import { GenerationResult } from "../../types";
import { useDownload } from "../../hooks/useDownload";

interface ResultCardProps {
  result: GenerationResult;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const { handleDownload, handleShare } = useDownload();
  const imageUrl = result.url.startsWith("/") ? `${CONFIG.API_URL}${result.url}` : result.url;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
        onLoadStart={() => console.log(`Image loading: ${imageUrl.substring(0, 60)}...`)}
        onError={(e) => console.error(`Image error: ${e.nativeEvent.error}`)}
      />
      <View style={styles.overlay}>
        <Text style={styles.styleLabel}>{result.styleId.toUpperCase()}</Text>
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => handleDownload(result.url, `clipart_${result.styleId}.png`)}
          >
            <Download color="#FFFFFF" size={18} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => handleShare(result.url, `clipart_${result.styleId}.png`)}
          >
            <Share2 color="#FFFFFF" size={18} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: BORDER_RADIUS.lg,
    overflow: "hidden",
    marginBottom: SPACING.lg,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    ...SHADOWS.md,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: SPACING.md,
    backgroundColor: COLORS.glass,
    borderTopWidth: 1,
    borderTopColor: COLORS.glassBorder,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  styleLabel: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
    letterSpacing: 1,
  },
  actions: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: SPACING.sm,
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 10,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
});
