import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { ProfileProvider } from 'components/ProfileContext';
import { useColorScheme, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { Stack } from "expo-router";
import "../global.css";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ProfileProvider>
        <PaperProvider
          settings={{
            icon: (props) => <MaterialCommunityIcons {...props} />,
          }}
        >
          <Stack screenOptions={{
            headerShown: false
          }}/>
        </PaperProvider> 
      </ProfileProvider>
    </ThemeProvider>
  )
  ;
}
