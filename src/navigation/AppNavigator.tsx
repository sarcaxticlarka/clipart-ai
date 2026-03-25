import React from "react";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { UploadScreen } from "../screens/UploadScreen";
import { StyleSelectScreen } from "../screens/StyleSelectScreen";
import { ResultsScreen } from "../screens/ResultsScreen";
import { COLORS } from "../constants/theme";

const Stack = createStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Upload"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: COLORS.background },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Premium feel
      }}
    >
      <Stack.Screen name="Upload" component={UploadScreen} />
      <Stack.Screen name="StyleSelect" component={StyleSelectScreen} />
      <Stack.Screen name="Results" component={ResultsScreen} />
    </Stack.Navigator>
  );
};
