import { DrawerContentScrollView } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { Drawer } from 'react-native-paper';
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

    return (
        <DrawerContentScrollView className='bg-red-100'>
            <Drawer.Section title="JarvisEd">
                <Drawer.Item
                    label="Home"
                    active={activeIndex === 0}
                    onPress={() => handleClickEvent(0)}
                />
                <Drawer.Item
                    label="Administrators"
                    active={activeIndex === 1}
                    onPress={() => handleClickEvent(1)}
                />
                <Drawer.Item
                    label="Teachers"
                    active={activeIndex === 2}
                    onPress={() => handleClickEvent(2)}
                />
                <Drawer.Item
                    label="Students"
                    active={activeIndex === 3}
                    onPress={() => handleClickEvent(3)}
                />
                <Drawer.Item
                    label="Class Catalogue"
                    active={activeIndex === 4}
                    onPress={() => handleClickEvent(4)}
                />
                <Drawer.Item
                    label="Reports"
                    active={activeIndex === 5}
                    onPress={() => handleClickEvent(5)}
                />
                <Drawer.Item
                    label="Settings"
                    active={activeIndex === 6}
                    onPress={() => handleClickEvent(6)}
                />
            </Drawer.Section>
        </DrawerContentScrollView>
    )
}