import { GestureResponderEvent } from "react-native";
import IconButton from "components/buttons/IconButton";
import { IconType } from "components/IconContainer";
import clsx from "clsx";


export interface DeleteButtonProps {
    className?: string;
    onIconClicked: (e: GestureResponderEvent) => void;
}

const DeleteButton = ({
    className,
    onIconClicked,
}: DeleteButtonProps) => {

    return (
        <IconButton
            className={clsx(className, "bg-red-600")}
            iconProps={{
                name: 'delete',
                size: 20,
                color: '#000',
                type: IconType.MaterialCommunityIcons
            }}
            onIconClicked={onIconClicked}
        />
    )
}

export default DeleteButton;