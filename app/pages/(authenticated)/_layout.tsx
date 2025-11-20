import { Drawer } from 'expo-router/drawer';
import React, { useEffect, useRef } from 'react';
import AuthenticatedDrawer from 'components/AuthenticatedDrawer';
import { useRouter } from 'expo-router';
import { useProfile } from 'components/contexts/ProfileContext';

export default function AuthenticatedDrawerLayout() {
  const router = useRouter();
  const { profile } = useProfile();
  const isMounted = useRef(true);

  useEffect(() => {
    // Set mounted flag to false after a brief delay to allow profile to propagate
    const timeout = setTimeout(() => {
      isMounted.current = false;
      // After the delay, if profile is still null, redirect to login
      if (profile === null) {
        router.replace('/pages/auth/LoginPage');
      }
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, []);
  
  return (
  <Drawer
    screenOptions={{ headerShown: false }}
    drawerContent={(props) => <AuthenticatedDrawer {...props} />}
  >
    <Drawer.Screen
      name="home/index"
      options={{ drawerLabel: 'Home', title: 'Home' }}
    />
    <Drawer.Screen
      name="admins"
      options={{ drawerLabel: 'Administrators', title: '' }}
    />
    <Drawer.Screen
      name="teachers"
      options={{ drawerLabel: 'Teachers', title: '' }}
    />
    <Drawer.Screen
      name="students"
      options={{ drawerLabel: 'Students', title: '' }}
    />
    <Drawer.Screen
      name="classes"
      options={{ drawerLabel: 'Class Catalogue', title: '' }}
    />
    <Drawer.Screen
      name="reports"
      options={{ drawerLabel: 'Reports', title: '' }}
    />
    <Drawer.Screen
      name="settings/index"
      options={{ drawerLabel: 'Settings', title: '' }}
    />
  </Drawer>
  );
}