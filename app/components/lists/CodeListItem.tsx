import { Pressable, Text, View } from "react-native";
import { Code } from "lib/models/code"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import clsx from "clsx";


export interface CodeListItemProps {
    className?: string;
    code: Code;
    onEdit?: (code: Code) => void;
    onDelete?: (code: Code) => void;
    onPress?: (code: Code) => void;
}

const CodeListItem = ({
    className,
    code,
    onEdit,
    onDelete,
    onPress
}: CodeListItemProps) => {
    return (
        <Pressable
            className={clsx(
                "flex-row items-center rounded-xl p-4 mb-3 justify-between active:opacity-80 bg-gray-800",
                className
            )}
            onPress={() => onPress?.(code)}>
            <View className="flex-1">
                <Text className="text-lg font-semibold text-white">
                    {code.name}
                </Text>
                <Text className="text-sm text-gray-400 mt-1">
                    {code.description}
                </Text>
            </View>

            <View className="flex-row gap-2">
                {onEdit && (
                    <Pressable
                        className="bg-jarvisPrimary rounded-lg p-3 active:opacity-70"
                        onPress={(e) => {
                            e.stopPropagation();
                            onEdit(code);
                        }}>
                        <MaterialCommunityIcons name="pencil" size={20} color="#000" />
                    </Pressable>
                )}
                {onDelete && (
                    <Pressable
                        className="bg-red-600 rounded-lg p-3 active:opacity-70"
                        onPress={(e) => {
                            e.stopPropagation();
                            onDelete(code);
                        }}>
                        <MaterialCommunityIcons name="delete" size={20} color="#fff" />
                    </Pressable>
                )}
            </View>
        </Pressable>
    )
}

export default CodeListItem;
