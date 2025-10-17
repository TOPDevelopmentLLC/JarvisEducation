import { DrawerContentScrollView } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { router, usePathname } from 'expo-router';

export default function AuthenticatedDrawer({ navigation, state }: any) {
    const pathname = usePathname();
    const [activeIndex, setActiveIndex] = useState(0);

    // Update active index based on current route
    useEffect(() => {
        if (pathname.includes('/admins')) {
            setActiveIndex(1);
        } else if (pathname.includes('/teachers')) {
            setActiveIndex(2);
        } else if (pathname.includes('/students')) {
            setActiveIndex(3);
        } else if (pathname.includes('/classes')) {
            setActiveIndex(4);
        } else if (pathname.includes('/reports')) {
            setActiveIndex(5);
        } else if (pathname.includes('/settings')) {
            setActiveIndex(6);
        } else if (pathname.includes('/home')) {
            setActiveIndex(0);
        }
    }, [pathname]);

    const handleClickEvent = (index: number) => {
        switch (index) {
            case 1:
                router.push('/pages/admins');
                break;
            case 2:
                router.push('/pages/teachers');
                break;
            case 3:
                router.push('/pages/students');
                break;
            case 4:
                router.push('/pages/classes');
                break;
            case 5:
                router.push('/pages/reports');
                break;
            case 6:
                router.push('/pages/settings');
                break;
            case 0:
            default:
                router.push('/pages/home');
                break;
        }
    }

    const renderDrawerItem = (label: string, index: number) => {
        const isActive = activeIndex === index;
        return (
            <Pressable
                key={index}
                onPress={() => handleClickEvent(index)}
                style={{
                    backgroundColor: isActive ? '#9cb43c' : 'transparent',
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                }}
            >
                <Text
                    style={{
                        color: isActive ? '#000000' : '#FFFFFF',
                        fontSize: 16,
                        fontWeight: isActive ? 'bold' : 'normal',
                    }}
                >
                    {label}
                </Text>
            </Pressable>
        );
    };

    return (
        <DrawerContentScrollView
            style={{ backgroundColor: '#111827' }}
            contentContainerStyle={{ paddingTop: 0 }}
        >
            <View style={{ backgroundColor: '#111827', paddingVertical: 16, paddingHorizontal: 16 }}>
                <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 24 }}>
                    JarvisEd
                </Text>
            </View>

            <View style={{ marginTop: 8 }}>
                {renderDrawerItem('Home', 0)}
                {renderDrawerItem('Administrators', 1)}
                {renderDrawerItem('Teachers', 2)}
                {renderDrawerItem('Students', 3)}
                {renderDrawerItem('Class Catalogue', 4)}
                {renderDrawerItem('Reports', 5)}
                {renderDrawerItem('Settings', 6)}
            </View>
        </DrawerContentScrollView>
    )
}