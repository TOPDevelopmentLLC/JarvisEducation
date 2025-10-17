import { Pressable, Text, View } from "react-native";
import { Student } from "lib/models/student"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import clsx from "clsx";


export interface StudentListItemProps {
    className?: string;
    student: Student;
    onEdit?: (student: Student) => void;
    onDelete?: (student: Student) => void;
    onPress?: (student: Student) => void;
}

const StudentListItem = ({
    className,
    student,
    onEdit,
    onDelete,
    onPress
}: StudentListItemProps) => {
    return (
        <Pressable
            className={clsx("flex-row items-center bg-gray-800 rounded-xl p-4 mb-3 justify-between active:opacity-80", className)}
            onPress={() => onPress?.(student)}>
            <View className="flex-1">
                <Text className="text-white text-lg font-semibold">{student.name}</Text>
            </View>

            <View className="flex-row gap-2">
                {onEdit && (
                    <Pressable
                        className="bg-jarvisPrimary rounded-lg p-3 active:opacity-70"
                        onPress={(e) => {
                            e.stopPropagation();
                            onEdit(student);
                        }}>
                        <MaterialCommunityIcons name="pencil" size={20} color="#000" />
                    </Pressable>
                )}
                {onDelete && (
                    <Pressable
                        className="bg-red-600 rounded-lg p-3 active:opacity-70"
                        onPress={(e) => {
                            e.stopPropagation();
                            onDelete(student);
                        }}>
                        <MaterialCommunityIcons name="delete" size={20} color="#fff" />
                    </Pressable>
                )}
            </View>
        </Pressable>
    )
}

export default StudentListItem;