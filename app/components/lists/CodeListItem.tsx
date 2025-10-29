import { Pressable, Text, View } from "react-native";
import { Code } from "lib/models/code"
import clsx from "clsx";
import IconContainer, { IconType } from "components/IconContainer";
import EditButton from "components/buttons/EditButton";
import DeleteButton from "components/buttons/DeleteButton";


export interface CodeListItemProps {
    className?: string;
    code: Code;
    isSelected?: boolean;
    onEdit?: (code: Code) => void;
    onDelete?: (code: Code) => void;
    onPress?: (code: Code) => void;
}

const CodeListItem = ({
    className,
    code,
    isSelected = false,
    onEdit,
    onDelete,
    onPress
}: CodeListItemProps) => {
    return (
        <Pressable
            className={clsx(
                "flex-row items-center rounded-xl p-4 mb-3 justify-between active:opacity-80",
                isSelected ? "bg-jarvisPrimary" : "bg-gray-800",
                className
            )}
            onPress={() => onPress?.(code)}>
            <View className="flex-1">
                <Text className={clsx("text-lg font-semibold", isSelected ? "text-black" : "text-white")}>
                    {code.name}
                </Text>
                <Text className={clsx("text-sm mt-1", isSelected ? "text-gray-700" : "text-gray-400")}>
                    {code.description}
                </Text>
            </View>

            <View className="flex-row gap-2">
                {!onEdit && !onDelete && (
                    <View className="bg-black rounded-lg p-2 justify-center items-center" style={{ width: 40, height: 40 }}>
                        {isSelected && (
                            <IconContainer 
                                iconProps={{
                                    name: 'check',
                                    size: 24,
                                    color: "#9cb43c",
                                    type: IconType.MaterialCommunityIcons
                                }} 
                            />
                        )}
                    </View>
                )}
                {onEdit && (
                    <EditButton 
                        onIconClicked={(e) => {
                            e.stopPropagation();
                            onEdit(code);
                        }}
                    />
                )}
                {onDelete && (
                    <DeleteButton 
                        onIconClicked={(e) => {
                            e.stopPropagation();
                            onDelete(code);
                        }} 
                    />
                )}
            </View>
        </Pressable>
    )
}

export default CodeListItem;
