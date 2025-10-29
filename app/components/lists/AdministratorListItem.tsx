import clsx from "clsx";
import { Administrator } from "lib/models/administrator"
import { Pressable, Text, View } from "react-native"
import DeleteButton from "components/buttons/DeleteButton";
import EditButton from "components/buttons/EditButton";


export interface AdministratorListItemProps {
    className?: string;
    admin: Administrator;
    onEdit?: (admin: Administrator) => void;
    onDelete?: (admin: Administrator) => void;
    onPress?: (admin: Administrator) => void;
}

const AdministratorListItem = ({
    className,
    admin,
    onEdit,
    onDelete,
    onPress
}: AdministratorListItemProps) => {
    return (
        <Pressable
            className={clsx("flex-row items-center bg-gray-800 rounded-xl p-4 mb-3 justify-between active:opacity-80", className)}
            onPress={() => onPress?.(admin)}>
            <View className="flex-1">
                <Text className="text-white text-lg font-semibold">{admin.name}</Text>
            </View>

            <View className="flex-row gap-2">
                {onEdit && (
                    <EditButton 
                        onIconClicked={(e) => {
                            e.stopPropagation();
                            onEdit(admin);
                        }} 
                    />
                )}
                {onDelete && (
                    <DeleteButton 
                        onIconClicked={(e) => {
                            e.stopPropagation();
                            onDelete(admin);
                        }} 
                    />
                )}
            </View>
        </Pressable>
    )
}

export default AdministratorListItem;