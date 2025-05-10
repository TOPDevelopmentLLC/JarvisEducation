import { TouchableOpacity } from "react-native";
import IconContainer, { IconProps } from "../IconContainer";


export interface IconButtonProps {
    iconProps: IconProps;
    onIconClicked: () => void;
}

const IconButton = ({
    iconProps,
    onIconClicked
}: IconButtonProps) => {

    return (
        <TouchableOpacity style={{padding:5}} onPress={onIconClicked}>
            <IconContainer iconProps={iconProps}/>
        </TouchableOpacity>
    )
}

export default IconButton;