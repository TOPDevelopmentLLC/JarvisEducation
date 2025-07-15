import IconButton, { IconButtonProps } from "components/buttons/IconButton";
import { IconType } from "components/IconContainer";
import { router } from "expo-router";
import { View, Text } from "react-native";


interface DetailsHeaderProps {
    title?: string;
    leftActionIcon?: IconButtonProps|undefined;
    rightActionIcon?: IconButtonProps|undefined;
}

const DetailsHeader = ({
    title = '', 
    leftActionIcon,
    rightActionIcon,
}: DetailsHeaderProps) => {
    return (
        <View className="px-4 items-center bg-jarvisPrimary flex-row">
            <View className="flex-1 items-start h-full justify-center">
                {leftActionIcon && (
                    <IconButton 
                        iconProps={leftActionIcon.iconProps} 
                        onIconClicked={leftActionIcon.onIconClicked} 
                    />
                )}
                <IconButton 
                    iconProps={{
                        type: IconType.Feather,
                        color: '#000000',
                        size: 24,
                        name: ''
                    }} 
                    onIconClicked={() => router.back()}                
                />
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
    )
}

export default DetailsHeader;