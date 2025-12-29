import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useColorScheme as useRNColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ColorScheme = "light" | "dark" | null;

const THEME_STORAGE_KEY = "theme";

interface ThemeContextType {
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useRNColorScheme();
  const [manualColorScheme, setManualColorScheme] = useState<ColorScheme>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved theme preference on mount
  useEffect(() => {
    (async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme === "light" || savedTheme === "dark") {
          setManualColorScheme(savedTheme);
        }
      } catch (error) {
        console.error("Error loading theme from storage:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // Save theme preference whenever it changes
  useEffect(() => {
    if (!isLoading && manualColorScheme !== null) {
      AsyncStorage.setItem(THEME_STORAGE_KEY, manualColorScheme).catch(
        (error) => {
          console.error("Error saving theme to storage:", error);
        }
      );
    }
  }, [manualColorScheme, isLoading]);

  // Use manual scheme if set, otherwise fall back to system
  const colorScheme = manualColorScheme ?? systemColorScheme;

  const toggleTheme = () => {
    setManualColorScheme((current) => {
      const newTheme =
        current === "dark"
          ? "light"
          : current === "light"
            ? "dark"
            : systemColorScheme === "dark"
              ? "light"
              : "dark";
      return newTheme;
    });
  };

  const setColorScheme = (scheme: ColorScheme) => {
    setManualColorScheme(scheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        colorScheme: colorScheme as ColorScheme,
        setColorScheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
