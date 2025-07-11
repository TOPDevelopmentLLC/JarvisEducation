import { TouchableOpacity } from "react-native";
import IconContainer, { IconProps } from "components/IconContainer";
import clsx from "clsx";


export interface IconButtonProps {
    className?: string;
    iconProps: IconProps;
    onIconClicked: () => void;
}

const IconButton = ({
    className,
    iconProps,
    onIconClicked
}: IconButtonProps) => {

    return (
        <TouchableOpacity className={clsx('p-2', className)} onPress={onIconClicked}>
            <IconContainer iconProps={iconProps}/>
        </TouchableOpacity>
    )
}

export default IconButton;