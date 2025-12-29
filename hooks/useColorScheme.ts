import { useColorScheme as useRNColorScheme } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

export function useColorScheme() {
  try {
    const { colorScheme } = useTheme();
    return colorScheme ?? 'light';
  } catch {
    // Fallback if ThemeProvider is not available
    return useRNColorScheme() ?? 'light';
  }
}
