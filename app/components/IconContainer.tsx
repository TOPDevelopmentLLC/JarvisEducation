import { View } from "react-native"


export enum IconType {
    Feather,
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons
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

const IconContainer = ({
    iconProps
}: IconContainerProps) => {

    return (
        <View>
            {
                //TODO: Map Icon type to a view
            }
        </View>
    )
}

export default IconContainer;