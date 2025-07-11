import { Drawer } from 'expo-router/drawer';
import React from 'react';
import AuthenticatedDrawer from 'components/AuthenticatedDrawer';

export default function AuthenticatedDrawerLayout() {
  
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