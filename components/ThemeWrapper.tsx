import { useEffect } from "react";
import { View, Platform } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import type { ReactNode } from "react";

export function ThemeWrapper({ children }: { children: ReactNode }) {
  const { colorScheme } = useTheme();
  const isDark = colorScheme === "dark";

  // For web, apply dark class to document element
  useEffect(() => {
    if (Platform.OS === "web" && typeof document !== "undefined") {
      const htmlElement = document.documentElement;
      if (isDark) {
        htmlElement.classList.add("dark");
      } else {
        htmlElement.classList.remove("dark");
      }
    }
  }, [isDark]);

  return (
    <View className={isDark ? "dark" : undefined} style={{ flex: 1 }}>
      {children}
    </View>
  );
}

