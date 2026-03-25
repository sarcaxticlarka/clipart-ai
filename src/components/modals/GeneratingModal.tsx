import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from "../../constants/theme";

interface GeneratingModalProps {
  visible: boolean;
  styleCount: number;
}

export const GeneratingModal: React.FC<GeneratingModalProps> = ({
  visible,
  styleCount,
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const dotAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Pulsing glow
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.15,
            duration: 1200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Slow rotation
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 8000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();

      // Dots animation
      Animated.loop(
        Animated.timing(dotAnim, {
          toValue: 3,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: false,
        })
      ).start();
    }

    return () => {
      pulseAnim.setValue(1);
      rotateAnim.setValue(0);
      dotAnim.setValue(0);
    };
  }, [visible]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.content}>
          {/* Animated AI Icon */}
          <Animated.View
            style={[
              styles.iconContainer,
              {
                transform: [{ scale: pulseAnim }, { rotate: rotation }],
              },
            ]}
          >
            <LinearGradient
              colors={["#FF6B35", "#FF9F1C", "#FFD93D"]}
              style={styles.iconGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.iconText}>✨</Text>
            </LinearGradient>
          </Animated.View>

          {/* Title */}
          <Text style={styles.title}>Creating Magic</Text>
          <Text style={styles.subtitle}>
            Generating {styleCount} {styleCount === 1 ? "style" : "styles"}...
          </Text>

          {/* Progress bar */}
          <View style={styles.progressTrack}>
            <Animated.View style={[styles.progressBar]}>
              <LinearGradient
                colors={["#FF6B35", "#FF9F1C"]}
                style={styles.progressFill}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
            </Animated.View>
          </View>

          <Text style={styles.hint}>
            AI is transforming your photo into premium clipart
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(5, 5, 10, 0.92)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: SPACING.xl,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: SPACING.xl,
    ...({
      shadowColor: "#FF6B35",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.6,
      shadowRadius: 30,
      elevation: 10,
    }),
  },
  iconGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    fontSize: 42,
  },
  title: {
    ...TYPOGRAPHY.hero,
    color: COLORS.onBackground,
    marginBottom: SPACING.sm,
    textAlign: "center",
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.muted,
    marginBottom: SPACING.xl,
    textAlign: "center",
  },
  progressTrack: {
    width: width * 0.6,
    height: 4,
    backgroundColor: COLORS.surface,
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: SPACING.lg,
  },
  progressBar: {
    width: "100%",
    height: "100%",
  },
  progressFill: {
    flex: 1,
    borderRadius: 2,
  },
  hint: {
    ...TYPOGRAPHY.caption,
    color: COLORS.muted,
    textAlign: "center",
    maxWidth: 250,
  },
});
