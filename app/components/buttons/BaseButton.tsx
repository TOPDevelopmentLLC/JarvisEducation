import clsx from 'clsx';
import React from 'react';
import { Text, Pressable } from 'react-native';

export interface BaseButtonProps {
    className?: string;
    textClassName?: string;
    title: string;
    onPress: () => void;
}

const BaseButton = ({
    className,
    textClassName,
    title,
    onPress,
}: BaseButtonProps) => {
    return (
        <Pressable
            className={clsx('px-8 py-4', className)}
            onPress={onPress}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={title}>
            <Text className={textClassName}>{title}</Text>
        </Pressable>
    );
};

export default BaseButton;
