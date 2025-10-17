import { useRouter } from "expo-router";
import React from "react";
import { View, Text } from "react-native";
import IconButton, { IconButtonProps } from "components/buttons/IconButton";

interface BaseHeaderProps {
    title?: string;
    leftActionIcon?: IconButtonProps|undefined;
    rightActionIcon?: IconButtonProps|undefined;
  }
  
const BaseHeader = ({
    title = '',
    leftActionIcon,
    rightActionIcon,
}: BaseHeaderProps) => {
    const router = useRouter();

    return (
        <View className="px-6 py-2 items-center bg-gray-800 flex-row border-b border-gray-700">
            <View className="flex-1 items-start justify-center">
                {leftActionIcon && (
                    <IconButton
                        iconProps={leftActionIcon.iconProps}
                        onIconClicked={leftActionIcon.onIconClicked}
                    />
                )}
            </View>
            <Text className="text-2xl font-bold text-white">{title}</Text>
            <View className="flex-1 justify-center items-end">
                {rightActionIcon && (
                    <IconButton
                        iconProps={rightActionIcon.iconProps}
                        onIconClicked={rightActionIcon.onIconClicked}
                    />
                )}
            </View>
        </View>
    );
};

export default BaseHeader;