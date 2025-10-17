import { Pressable, Text, View } from "react-native";
import { Course } from "lib/models/course";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import clsx from "clsx";


export interface CourseListItemProps {
    className?: string;
    course: Course;
    onEdit?: (course: Course) => void;
    onDelete?: (course: Course) => void;
    onPress?: (course: Course) => void;
}

const CourseListItem = ({
    className,
    course,
    onEdit,
    onDelete,
    onPress
}: CourseListItemProps) => {
    return (
        <Pressable
            className={clsx("flex-row items-center bg-gray-800 rounded-xl p-4 mb-3 justify-between active:opacity-80", className)}
            onPress={() => onPress?.(course)}>
            <View className="flex-1">
                <Text className="text-white text-lg font-semibold">{course.title}</Text>
                <Text className="text-gray-400 text-sm mt-1" numberOfLines={1}>{course.description}</Text>
            </View>

            <View className="flex-row gap-2 ml-3">
                {onEdit && (
                    <Pressable
                        className="bg-jarvisPrimary rounded-lg p-3 active:opacity-70"
                        onPress={(e) => {
                            e.stopPropagation();
                            onEdit(course);
                        }}>
                        <MaterialCommunityIcons name="pencil" size={20} color="#000" />
                    </Pressable>
                )}
                {onDelete && (
                    <Pressable
                        className="bg-red-600 rounded-lg p-3 active:opacity-70"
                        onPress={(e) => {
                            e.stopPropagation();
                            onDelete(course);
                        }}>
                        <MaterialCommunityIcons name="delete" size={20} color="#fff" />
                    </Pressable>
                )}
            </View>
        </Pressable>
    )
}

export default CourseListItem;