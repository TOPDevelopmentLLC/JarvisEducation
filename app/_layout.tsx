import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { ProfileProvider } from 'components/contexts/ProfileContext';
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { Slot } from "expo-router";
import "../global.css";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import StateDataProvider from 'components/contexts/StateDataProvider';
import { SnackbarProvider } from 'components/contexts/SnackbarContext';
import { HistoricalYearProvider } from 'components/contexts/HistoricalYearContext';

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
            <SnackbarProvider>
              <HistoricalYearProvider>
                <Slot />
              </HistoricalYearProvider>
            </SnackbarProvider>
          </PaperProvider>
        </StateDataProvider>
      </ProfileProvider>
    </ThemeProvider>
  );
}
