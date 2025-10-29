import { Pressable, Text, View } from "react-native";
import { Course } from "lib/models/course";
import clsx from "clsx";
import EditButton from "components/buttons/EditButton";
import DeleteButton from "components/buttons/DeleteButton";


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
                    <EditButton 
                        onIconClicked={(e) => {
                            e.stopPropagation();
                            onEdit(course);
                        }}
                    />
                )}
                {onDelete && (
                    <DeleteButton 
                        onIconClicked={(e) => {
                            e.stopPropagation();
                            onDelete(course);
                        }} 
                    />
                )}
            </View>
        </Pressable>
    )
}

export default CourseListItem;