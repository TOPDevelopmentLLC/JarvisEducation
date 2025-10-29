import clsx from "clsx";
import IconButton from "components/buttons/IconButton";
import { IconType } from "components/IconContainer";
import { GestureResponderEvent } from "react-native";


export interface EditButtonProps {
    className?: string;
    onIconClicked: (e: GestureResponderEvent) => void;
}

const EditButton = ({
    className,
    onIconClicked,
}: EditButtonProps) => {

    return (
        <IconButton
            className={clsx(className, "bg-jarvisPrimary")}
            iconProps={{
                name: 'pencil',
                size: 20,
                color: '#000',
                type: IconType.MaterialCommunityIcons
            }}
            onIconClicked={onIconClicked}
        />
    )
}

export default EditButton;