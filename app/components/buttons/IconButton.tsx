import { GestureResponderEvent, TouchableOpacity } from "react-native";
import IconContainer, { IconProps } from "components/IconContainer";
import clsx from "clsx";


export interface IconButtonProps {
    className?: string;
    iconProps: IconProps;
    onIconClicked: (e:GestureResponderEvent) => void;
}

const IconButton = ({
    className,
    iconProps,
    onIconClicked
}: IconButtonProps) => {

    return (
        <TouchableOpacity className={clsx('rounded-lg p-3 active:opacity-70', className)} onPress={onIconClicked}>
            <IconContainer iconProps={iconProps}/>
        </TouchableOpacity>
    )
}

export default IconButton;