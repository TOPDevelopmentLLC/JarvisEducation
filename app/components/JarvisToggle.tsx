import React from 'react';
import { View, Text, Switch } from 'react-native';
import clsx from 'clsx';

export interface JarvisToggleProps {
    className?: string;
    label: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
    description?: string;
}

const JarvisToggle = ({
    className,
    label,
    value,
    onValueChange,
    description
}: JarvisToggleProps) => {
    return (
        <View className={clsx("flex-row items-center justify-between py-4 px-6 bg-gray-800 rounded-lg", className)}>
            <View className="flex-1 mr-4">
                <Text className="text-white text-base font-semibold mb-1">
                    {label}
                </Text>
                {description && (
                    <Text className="text-gray-400 text-sm">
                        {description}
                    </Text>
                )}
            </View>
            <Switch
                trackColor={{ false: '#4B5563', true: '#9cb43c' }}
                thumbColor={value ? '#000000' : '#9CA3AF'}
                ios_backgroundColor="#4B5563"
                onValueChange={onValueChange}
                value={value}
            />
        </View>
    );
};

export default JarvisToggle;
