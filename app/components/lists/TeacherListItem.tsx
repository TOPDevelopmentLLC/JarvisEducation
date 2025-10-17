import { Pressable, Text, View } from "react-native";
import { Teacher } from "lib/models/teacher";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import clsx from "clsx";


export interface TeacherListItemProps {
    className?: string;
    teacher: Teacher;
    onEdit?: (teacher: Teacher) => void;
    onDelete?: (teacher: Teacher) => void;
    onPress?: (teacher: Teacher) => void;
}

const TeacherListItem = ({
    className,
    teacher,
    onEdit,
    onDelete,
    onPress
}: TeacherListItemProps) => {
    return (
        <Pressable
            className={clsx("flex-row items-center bg-gray-800 rounded-xl p-4 mb-3 justify-between active:opacity-80", className)}
            onPress={() => onPress?.(teacher)}>
            <View className="flex-1">
                <Text className="text-white text-lg font-semibold">{teacher.name}</Text>
            </View>

            <View className="flex-row gap-2">
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