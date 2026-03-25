import React, { useState } from "react";
import { View, StyleSheet, Image, Text, ScrollView } from "react-native";
import { Header } from "../components/ui/Header";
import { Button } from "../components/ui/Button";
import { GradientBackground } from "../components/ui/GradientBackground";
import { useImagePicker } from "../hooks/useImagePicker";
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from "../constants/theme";
import { Image as ImageIcon } from "lucide-react-native";

export const UploadScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { imageUri, handlePick, error } = useImagePicker();

  return (
    <GradientBackground variant="warm">
      <Header title="Clipart AI" />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Hero Text */}
        <Text style={styles.hero}>Create Your{"\n"}AI Clipart</Text>
        <Text style={styles.subtitle}>
          Upload a clear photo and watch AI transform it into premium clipart
        </Text>

        {/* Image Preview */}
        <View style={styles.previewContainer}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.preview} />
          ) : (
            <View style={styles.placeholder}>
              <View style={styles.placeholderIconWrap}>
                <ImageIcon color={COLORS.muted} size={48} />
              </View>
              <Text style={styles.placeholderTitle}>No image selected</Text>
              <Text style={styles.placeholderHint}>Tap a button below to get started</Text>
            </View>
          )}
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}

        {/* Upload Button */}
        <Button
          title="Upload Photo"
          onPress={() => handlePick(false)}
          variant="primary"
          style={{ width: "100%" }}
        />
      </ScrollView>

      {/* Bottom CTA */}
      {imageUri && (
        <View style={styles.footer}>
          <Button
            title="Continue"
            variant="cta"
            onPress={() => navigation.navigate("StyleSelect", { imageUri })}
          />
        </View>
      )}
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: SPACING.lg,
    paddingBottom: 120,
  },
  hero: {
    ...TYPOGRAPHY.hero,
    color: COLORS.onBackground,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.muted,
    marginBottom: SPACING.xl,
    lineHeight: 22,
  },
  previewContainer: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.glass,
    overflow: "hidden",
    marginBottom: SPACING.xl,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: COLORS.glassBorder,
    borderStyle: "dashed",
  },
  preview: {
    width: "100%",
    height: "100%",
    borderRadius: BORDER_RADIUS.lg,
  },
  placeholder: {
    alignItems: "center",
    padding: SPACING.xl,
  },
  placeholderIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.surface,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  placeholderTitle: {
    ...TYPOGRAPHY.subheading,
    color: COLORS.mutedLight,
    marginBottom: SPACING.xs,
  },
  placeholderHint: {
    ...TYPOGRAPHY.caption,
    color: COLORS.muted,
  },
  buttonRow: {
    flexDirection: "row",
    width: "100%",
  },
  flexButton: {
    flex: 1,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  errorText: {
    color: COLORS.error,
    marginBottom: SPACING.md,
    textAlign: "center",
  },
});
