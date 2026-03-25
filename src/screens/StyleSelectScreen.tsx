import React, { useState } from "react";
import { View, StyleSheet, Text, FlatList, TextInput } from "react-native";
import { Header } from "../components/ui/Header";
import { Button } from "../components/ui/Button";
import { StyleCard } from "../components/cards/StyleCard";
import { GradientBackground } from "../components/ui/GradientBackground";
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from "../constants/theme";
import { GENERATION_STYLES, StyleId } from "../constants/styles";

export const StyleSelectScreen: React.FC<{ navigation: any; route: any }> = ({
  navigation,
  route,
}) => {
  const { imageUri } = route.params;
  const [selectedStyles, setSelectedStyles] = useState<StyleId[]>(["cartoon"]);
  const [prompt, setPrompt] = useState("");

  const toggleStyle = (id: string) => {
    const styleId = id as StyleId;
    if (selectedStyles.includes(styleId)) {
      setSelectedStyles(selectedStyles.filter((s) => s !== styleId));
    } else {
      setSelectedStyles([...selectedStyles, styleId]);
    }
  };

  return (
    <GradientBackground variant="cool">
      <Header title="Choose Styles" showBack />
      <FlatList
        data={GENERATION_STYLES}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styleSheet.row}
        ListHeaderComponent={
          <>
            {/* Hero */}
            <Text style={styleSheet.hero}>Choose Your{"\n"}Style</Text>
            <Text style={styleSheet.subtitle}>
              Select one or more styles. We'll generate them in parallel.
            </Text>

            {/* Prompt Input */}
            <View style={styleSheet.inputContainer}>
              <Text style={styleSheet.inputLabel}>✍️ Describe your subject</Text>
              <TextInput
                style={styleSheet.input}
                placeholder="e.g. A smiling young woman with glasses"
                placeholderTextColor={COLORS.muted}
                value={prompt}
                onChangeText={setPrompt}
                multiline
              />
            </View>

            <Text style={styleSheet.sectionTitle}>Available Styles</Text>
          </>
        }
        renderItem={({ item }) => (
          <StyleCard
            style={item}
            selected={selectedStyles.includes(item.id)}
            onSelect={toggleStyle}
          />
        )}
        contentContainerStyle={styleSheet.list}
      />

      {/* Bottom CTA */}
      <View style={styleSheet.footer}>
        <Button
          title={`Generate ${selectedStyles.length} ${selectedStyles.length === 1 ? "Style" : "Styles"}`}
          variant="cta"
          disabled={selectedStyles.length === 0}
          onPress={() =>
            navigation.navigate("Results", { imageUri, styles: selectedStyles, prompt })
          }
        />
      </View>
    </GradientBackground>
  );
};

const styleSheet = StyleSheet.create({
  list: {
    padding: SPACING.lg,
    paddingBottom: 120,
  },
  row: {
    justifyContent: "space-between",
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
  inputContainer: {
    marginBottom: SPACING.xl,
  },
  inputLabel: {
    ...TYPOGRAPHY.subheading,
    color: COLORS.accent,
    marginBottom: SPACING.sm,
  },
  input: {
    backgroundColor: COLORS.glass,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    color: COLORS.onSurface,
    minHeight: 80,
    fontSize: 16,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  sectionTitle: {
    ...TYPOGRAPHY.subheading,
    color: COLORS.onBackground,
    marginBottom: SPACING.md,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
});
