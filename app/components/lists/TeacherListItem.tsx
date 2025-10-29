import { Pressable, Text, View } from "react-native";
import { Teacher } from "lib/models/teacher";
import clsx from "clsx";
import IconContainer, { IconType } from "components/IconContainer";
import EditButton from "components/buttons/EditButton";
import DeleteButton from "components/buttons/DeleteButton";


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
                            onEdit(teacher);
                        }}
                    />
                )}
                {onDelete && (
                    <DeleteButton 
                        onIconClicked={(e) => {
                            e.stopPropagation();
                            onDelete(teacher);
                        }} 
                    />
                )}
            </View>
        </Pressable>
    )
}

export default TeacherListItem;