import clsx from "clsx";
import { Administrator } from "lib/models/administrator"
import { Pressable, Text, View } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons';


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
                    <Pressable
                        className="bg-jarvisPrimary rounded-lg p-3 active:opacity-70"
                        onPress={(e) => {
                            e.stopPropagation();
                            onEdit(admin);
                        }}>
                        <MaterialCommunityIcons name="pencil" size={20} color="#000" />
                    </Pressable>
                )}
                {onDelete && (
                    <Pressable
                        className="bg-red-600 rounded-lg p-3 active:opacity-70"
                        onPress={(e) => {
                            e.stopPropagation();
                            onDelete(admin);
                        }}>
                        <MaterialCommunityIcons name="delete" size={20} color="#fff" />
                    </Pressable>
                )}
            </View>
        </Pressable>
    )
}

export default AdministratorListItem;