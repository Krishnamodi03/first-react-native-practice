import { View, Switch, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/contexts/ThemeContext";

export function ThemeToggle() {
  const { colorScheme, toggleTheme } = useTheme();
  const isDark = colorScheme === "dark";

  return (
    <View className="flex-row items-center justify-center gap-3">
      <Ionicons name="sunny" size={20} className="text-foreground" />
      <Switch
        value={isDark}
        onValueChange={toggleTheme}
        trackColor={{
          false: "#e5e7eb",
          true: "#3b82f6",
        }}
        thumbColor={Platform.OS === "android" ? "#ffffff" : undefined}
        ios_backgroundColor="#e5e7eb"
        accessibilityLabel={
          isDark ? "Switch to light mode" : "Switch to dark mode"
        }
      />
      <Ionicons name="moon" size={20} className="text-foreground" />
    </View>
  );
}
