import {
    Feather,
    FontAwesome5,
    FontAwesome6,
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons
} from "@expo/vector-icons"


export enum IconType {
    Feather = "Feather",
    Ionicons = "Ionicons",
    MaterialCommunityIcons = "MaterialCommunityIcons",
    MaterialIcons = "MaterialIcons",
    FontAwesome5 = "FontAwesome5",
    FontAwesome6 = "FontAwesome6"
}

export interface IconProps {
    name: string,
    size: number,
    color: string,
    type: IconType
}

export interface IconContainerProps {
    iconProps: IconProps
}

const iconMap = {
    Feather,
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons,
    FontAwesome5,
    FontAwesome6
}

const IconContainer = ({
    iconProps
}: IconContainerProps) => {
    const MappedIcon = iconMap[iconProps.type];
    return (
        <MappedIcon name={iconProps.name} color={iconProps.color} size={iconProps.size} />
    )
}

export default IconContainer;