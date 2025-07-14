import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { ProfileProvider } from 'components/contexts/ProfileContext';
import { useColorScheme, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { Stack } from "expo-router";
import "../global.css";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import StateDataProvider from 'components/contexts/StateDataProvider';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ProfileProvider>
        <StateDataProvider>
          <PaperProvider
            settings={{
              icon: (props) => <MaterialCommunityIcons {...props} />,
            }}
          >
            <Stack screenOptions={{
              headerShown: false
            }}/>
          </PaperProvider> 
        </StateDataProvider>
      </ProfileProvider>
    </ThemeProvider>
  )
  ;
}
