import clsx from 'clsx';
import React from 'react';
import { Text, View, Pressable } from 'react-native';

export interface JarvisButtonProps {
    className?: string;
    title: string;
    type?: JarvisButtonType;
    onPress: () => void;
}  

export enum JarvisButtonType {
    default,
    detail,
    transparent
}

const JarvisButton = ({
    className,
    title,
    type = JarvisButtonType.default,
    onPress,
} : JarvisButtonProps ) => {
    const buttonAccessibilityRole="button";
    const finalClassName = clsx(className, 'items-center rounded-lg', {
        'p-3 text-xs': type === JarvisButtonType.detail,
        'bg-transparent text-base': type === JarvisButtonType.transparent,
        'px-8 py-4 text-base bg-jarvisPrimary': type === JarvisButtonType.default
    })
    
    var finalButton;
    switch (type) {
        case JarvisButtonType.detail:
            finalButton = (
                <View>
                    <Pressable 
                        className={finalClassName}
                        onPress={onPress}
                        accessible={true}
                        accessibilityRole={buttonAccessibilityRole}
                        accessibilityLabel={title}>
                        <Text className='text-white'>{title}</Text>
                    </Pressable>
                </View>
            )
            break;
        case JarvisButtonType.transparent:
            finalButton = (
                <View>
                    <Pressable 
                        className={finalClassName}
                        onPress={onPress}
                        accessible={true}
                        accessibilityRole={buttonAccessibilityRole}
                        accessibilityLabel={title}>
                        <Text className='text-jarvisPrimary'>{title}</Text>
                    </Pressable>
                </View>
            )
            break;
        default:
            finalButton = (
                <View>
                    <Pressable 
                        className={finalClassName}
                        onPress={onPress}
                        accessible={true}
                        accessibilityRole={buttonAccessibilityRole}
                        accessibilityLabel={title}>
                        <Text className='text-black'>{title}</Text>
                    </Pressable>
                </View>
            )
            break;
    }

    return finalButton;
};

export default JarvisButton;