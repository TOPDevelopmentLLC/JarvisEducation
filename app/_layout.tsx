import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from "expo-router";
import "./global.css";
import { useColorScheme } from 'react-native';
import { ProfileProvider } from './components/ProfileContext';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <ProfileProvider>
          <Stack screenOptions={{
            headerShown: false
          }}/>
        </ProfileProvider>
    </ThemeProvider>
  )
  ;
}
