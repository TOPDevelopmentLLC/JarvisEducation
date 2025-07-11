import { Text, TouchableOpacity } from "react-native";
import IconContainer, { IconProps } from "components/IconContainer";
import clsx from "clsx";


export enum LabelLocation {
    Start,
    End
}

export interface LabeledIconButtonProps {
    className?: string;
    label: string;
    iconProps: IconProps;
    onIconClicked: () => void;
    labelLocation?: LabelLocation;
}

const IconButton = ({
    className,
    label,
    iconProps,
    onIconClicked,
    labelLocation = LabelLocation.Start
}: LabeledIconButtonProps) => {

    return (
        <TouchableOpacity className={clsx("p-2", className)} onPress={onIconClicked}>
            {labelLocation === LabelLocation.Start && <Text>{label}</Text>}
            <IconContainer iconProps={iconProps}/>
            {labelLocation === LabelLocation.End && <Text>{label}</Text>}
        </TouchableOpacity>
    )
}

export default IconButton;