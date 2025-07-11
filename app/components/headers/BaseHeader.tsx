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
        <View className="px-4 items-center bg-jarvisPrimary flex-row">
            <View className="flex-1 items-start h-full justify-center">
                {leftActionIcon && (
                    <IconButton 
                        iconProps={leftActionIcon.iconProps} 
                        onIconClicked={leftActionIcon.onIconClicked} 
                    />
                )}
            </View>
            <Text className="text-xl font-bold">{title}</Text>
            <View className="flex-1 h-full justify-center items-end">
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