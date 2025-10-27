import { Pressable, Text, View } from "react-native";
import { Teacher } from "lib/models/teacher";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import clsx from "clsx";


export interface TeacherListItemProps {
    className?: string;
    teacher: Teacher;
    isSelected?: boolean;
    onEdit?: (teacher: Teacher) => void;
    onDelete?: (teacher: Teacher) => void;
    onPress?: (teacher: Teacher) => void;
}

const TeacherListItem = ({
    className,
    teacher,
    isSelected = false,
    onEdit,
    onDelete,
    onPress
}: TeacherListItemProps) => {
    return (
        <Pressable
            className={clsx(
                "flex-row items-center rounded-xl p-4 mb-3 justify-between active:opacity-80",
                isSelected ? "bg-jarvisPrimary" : "bg-gray-800",
                className
            )}
            onPress={() => onPress?.(teacher)}>
            <View className="flex-1">
                <Text className={clsx("text-lg font-semibold", isSelected ? "text-black" : "text-white")}>
                    {teacher.name}
                </Text>
            </View>

            <View className="flex-row gap-2">
                {!onEdit && !onDelete && (
                    <View className="bg-black rounded-lg p-2 justify-center items-center" style={{ width: 40, height: 40 }}>
                        {isSelected && <MaterialCommunityIcons name="check" size={24} color="#9cb43c" />}
                    </View>
                )}
                {onEdit && (
                    <Pressable
                        className="bg-jarvisPrimary rounded-lg p-3 active:opacity-70"
                        onPress={(e) => {
                            e.stopPropagation();
                            onEdit(teacher);
                        }}>
                        <MaterialCommunityIcons name="pencil" size={20} color="#000" />
                    </Pressable>
                )}
                {onDelete && (
                    <Pressable
                        className="bg-red-600 rounded-lg p-3 active:opacity-70"
                        onPress={(e) => {
                            e.stopPropagation();
                            onDelete(teacher);
                        }}>
                        <MaterialCommunityIcons name="delete" size={20} color="#fff" />
                    </Pressable>
                )}
            </View>
        </Pressable>
    )
}

export default TeacherListItem;