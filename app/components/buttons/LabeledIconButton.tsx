import { Text, TouchableOpacity } from "react-native";
import IconContainer, { IconProps } from "components/IconContainer";


export enum LabelLocation {
    Start,
    End
}

export interface LabeledIconButtonProps {
    label: string;
    iconProps: IconProps;
    onIconClicked: () => void;
    labelLocation?: LabelLocation;
}

const IconButton = ({
    label,
    iconProps,
    onIconClicked,
    labelLocation = LabelLocation.Start
}: LabeledIconButtonProps) => {

    return (
        <TouchableOpacity style={{padding:5}} onPress={onIconClicked}>
            {labelLocation === LabelLocation.Start && <Text>{label}</Text>}
            <IconContainer iconProps={iconProps}/>
            {labelLocation === LabelLocation.End && <Text>{label}</Text>}
        </TouchableOpacity>
    )
}

export default IconButton;