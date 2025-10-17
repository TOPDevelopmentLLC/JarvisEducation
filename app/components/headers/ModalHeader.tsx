import IconContainer, { IconProps } from "components/IconContainer";
import { View, Text } from "react-native";
import { Divider } from "react-native-paper";


export interface ModalHeaderProps {
    title: string;
    icon: IconProps;
}

const ModalHeader = ({
    title,
    icon,
}: ModalHeaderProps) => {

    return (
        <>
            <View className="items-center mb-4">
                <View className="bg-jarvisPrimary rounded-full p-4 mb-3">
                    <IconContainer iconProps={icon} />
                </View>
                <Text className="text-2xl text-white font-bold">{title}</Text>
            </View>
            <Divider className="mb-4 bg-gray-700"/>
        </>
    )
}

export default ModalHeader;