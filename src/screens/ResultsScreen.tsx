import React, { useEffect } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { Header } from "../components/ui/Header";
import { Button } from "../components/ui/Button";
import { ResultCard } from "../components/cards/ResultCard";
import { GeneratingModal } from "../components/modals/GeneratingModal";
import { GradientBackground } from "../components/ui/GradientBackground";
import { useGeneration } from "../hooks/useGeneration";
import { COLORS, SPACING, TYPOGRAPHY } from "../constants/theme";

export const ResultsScreen: React.FC<{ navigation: any; route: any }> = ({
  navigation,
  route,
}) => {
  const { styles: selectedStyles, prompt, imageUri } = route.params;
  const { isGenerating, results, error, startGeneration } = useGeneration();

  useEffect(() => {
    startGeneration(selectedStyles, prompt, imageUri);
  }, []);

  return (
    <GradientBackground variant="result">
      <Header title="Your Clipart" showBack />

      {/* Generating Modal */}
      <GeneratingModal
        visible={isGenerating}
        styleCount={selectedStyles.length}
      />

      {error ? (
        <View style={screenStyles.center}>
          <Text style={screenStyles.errorEmoji}>😕</Text>
          <Text style={screenStyles.errorText}>{error}</Text>
          <Button
            title="Retry"
            onPress={() => startGeneration(selectedStyles, prompt)}
          />
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item, index) => item.styleId + index}
          renderItem={({ item }) => <ResultCard result={item} />}
          ListHeaderComponent={
            !isGenerating && results.length > 0 ? (
              <View style={screenStyles.header}>
                <Text style={screenStyles.hero}>
                  Generation{"\n"}Complete! ✨
                </Text>
                <Text style={screenStyles.subtitle}>
                  Here are your premium clipart versions. Download or share them below.
                </Text>
              </View>
            ) : null
          }
          contentContainerStyle={screenStyles.list}
        />
      )}

      {/* Bottom CTA */}
      {!isGenerating && results.length > 0 && (
        <View style={screenStyles.footer}>
          <Button
            title="New Project"
            variant="cta"
            onPress={() => navigation.navigate("Upload")}
          />
        </View>
      )}
    </GradientBackground>
  );
};

const screenStyles = StyleSheet.create({
  list: {
    padding: SPACING.lg,
    paddingBottom: 120,
  },
  header: {
    marginBottom: SPACING.xl,
  },
  hero: {
    ...TYPOGRAPHY.hero,
    color: COLORS.onBackground,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.muted,
    lineHeight: 22,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.xl,
  },
  errorEmoji: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
  errorText: {
    color: COLORS.error,
    textAlign: "center",
    marginBottom: SPACING.xl,
    ...TYPOGRAPHY.body,
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
