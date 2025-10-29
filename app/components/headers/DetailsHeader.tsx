import IconButton, { IconButtonProps } from "components/buttons/IconButton";
import { IconType } from "components/IconContainer";
import { router } from "expo-router";
import { View, Text } from "react-native";


interface DetailsHeaderProps {
    title?: string;
    leftActionIcon?: IconButtonProps|undefined;
    backButtonAction?: () => void;
    rightActionIcon?: IconButtonProps|undefined;
}

const DetailsHeader = ({
    title = '',
    leftActionIcon,
    backButtonAction,
    rightActionIcon,
}: DetailsHeaderProps) => {
    const backButtonPressed = () => {
        // Call the optional cleanup action first (e.g., clearing selected items)
        backButtonAction?.();
        // Then navigate back to the previous screen
        router.back();
    }

    return (
        <View className="px-6 py-2 items-center bg-gray-800 flex-row border-b border-gray-700">
            <View className="flex-1 items-start justify-center">
                <View className="flex-row">
                    {leftActionIcon && (
                        <IconButton
                            iconProps={leftActionIcon.iconProps}
                            onIconClicked={leftActionIcon.onIconClicked}
                        />
                    )}
                    <IconButton
                        iconProps={{
                            type: IconType.MaterialIcons,
                            color: '#FFFFFF',
                            size: 24,
                            name: 'arrow-back'
                        }}
                        onIconClicked={backButtonPressed}
                    />
                </View>
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
    )
}

export default DetailsHeader;