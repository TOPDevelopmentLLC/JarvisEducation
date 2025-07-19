import { Drawer } from 'expo-router/drawer';
import React, { useEffect } from 'react';
import AuthenticatedDrawer from 'components/AuthenticatedDrawer';
import { useRouter } from 'expo-router';
import { useProfile } from 'components/contexts/ProfileContext';

export default function AuthenticatedDrawerLayout() {
  const router = useRouter();
  const { profile } = useProfile();

  useEffect(() => {
    if (profile === null) {
      router.replace('/pages/auth/LoginPage');
    }
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