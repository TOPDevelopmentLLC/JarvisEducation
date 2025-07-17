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
            <View className="items-center">
                <IconContainer iconProps={icon} />
                <Text className="text-2xl text-black font-bold">{title}</Text>
            </View>
            <Divider className="mb-2"/>
        </>
    )
}

export default ModalHeader;