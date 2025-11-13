import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* This screen matches the 'app/(tabs)' directory group */}
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />

      {/* modal route */}
      <Stack.Screen
        name="modal"
        options={{ presentation: "modal", headerShown: false }}
      />
    </Stack>
  );
}