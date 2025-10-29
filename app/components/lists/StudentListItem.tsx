import { Pressable, Text, View } from "react-native";
import { Student } from "lib/models/student"
import clsx from "clsx";
import EditButton from "components/buttons/EditButton";
import DeleteButton from "components/buttons/DeleteButton";
import IconContainer, { IconType } from "components/IconContainer";


export interface StudentListItemProps {
    className?: string;
    student: Student;
    isSelected?: boolean;
    onEdit?: (student: Student) => void;
    onDelete?: (student: Student) => void;
    onPress?: (student: Student) => void;
}

const StudentListItem = ({
    className,
    student,
    isSelected = false,
    onEdit,
    onDelete,
    onPress
}: StudentListItemProps) => {
    return (
        <Pressable
            className={clsx(
                "flex-row items-center rounded-xl p-4 mb-3 justify-between active:opacity-80",
                isSelected ? "bg-jarvisPrimary" : "bg-gray-800",
                className
            )}
            onPress={() => onPress?.(student)}>
            <View className="flex-1">
                <Text className={clsx("text-lg font-semibold", isSelected ? "text-black" : "text-white")}>
                    {student.name}
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
                            onEdit(student);
                        }}
                    />
                )}
                {onDelete && (
                    <DeleteButton 
                        onIconClicked={(e) => {
                            e.stopPropagation();
                            onDelete(student);
                        }} 
                    />
                )}
            </View>
        </Pressable>
    )
}

export default StudentListItem;