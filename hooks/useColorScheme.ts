import { useEffect, useState } from 'react';
import { ColorSchemeName, useColorScheme as _useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Theme = 'light' | 'dark' | 'system';

// Create a singleton to store the current theme preference
let storedTheme: Theme | null = null;

export const useColorScheme = (): ColorSchemeName => {
  const systemColorScheme = _useColorScheme();
  const [themePreference, setThemePreference] = useState<Theme>('system');
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>(systemColorScheme);

  // Load theme preference from storage on mount
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        // Use cached theme if available
        if (storedTheme) {
          setThemePreference(storedTheme);
          setColorScheme(storedTheme === 'system' ? systemColorScheme : storedTheme);
          return;
        }

        // Load from AsyncStorage
        const savedTheme = await AsyncStorage.getItem('themePreference');
        const parsedTheme = savedTheme ? JSON.parse(savedTheme) as Theme : 'system';
        
        setThemePreference(parsedTheme);
        setColorScheme(parsedTheme === 'system' ? systemColorScheme : parsedTheme);
        storedTheme = parsedTheme;
      } catch (error) {
        console.error('Failed to load theme preference:', error);
      }
    };

    loadThemePreference();
  }, [systemColorScheme]);

  return colorScheme;
};

// Function to set theme preference
export const setThemePreference = async (theme: Theme): Promise<void> => {
  try {
    await AsyncStorage.setItem('themePreference', JSON.stringify(theme));
    storedTheme = theme;
  } catch (error) {
    console.error('Failed to save theme preference:', error);
  }
};
