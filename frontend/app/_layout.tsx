import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
<<<<<<< HEAD
=======
import { SafeAreaProvider } from 'react-native-safe-area-context';
>>>>>>> 614608e10ca6c3da0f9d1c4b6fea6749e3c42918
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
<<<<<<< HEAD
  anchor: '(tabs)',
=======
  initialRouteName: 'index',
>>>>>>> 614608e10ca6c3da0f9d1c4b6fea6749e3c42918
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
<<<<<<< HEAD
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
=======
      <SafeAreaProvider>
        <Stack initialRouteName="index">
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="auto" />
      </SafeAreaProvider>
>>>>>>> 614608e10ca6c3da0f9d1c4b6fea6749e3c42918
    </ThemeProvider>
  );
}
