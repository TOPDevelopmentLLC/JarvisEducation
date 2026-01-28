import { Pressable, Text, View } from "react-native";
import { Holiday } from "lib/models/schoolYearSettings";
import clsx from "clsx";
import DeleteButton from "components/buttons/DeleteButton";


export interface HolidayListItemProps {
    className?: string;
    holiday: Holiday;
    onDelete?: (holiday: Holiday) => void;
    onPress?: (holiday: Holiday) => void;
}

const HolidayListItem = ({
    className,
    holiday,
    onDelete,
    onPress
}: HolidayListItemProps) => {
    return (
        <Pressable
            className={clsx(
                "flex-row items-center rounded-xl p-4 mb-3 justify-between active:opacity-80 bg-gray-800",
                className
            )}
            onPress={() => onPress?.(holiday)}>
            <View className="flex-1">
                <Text className="text-white text-lg font-semibold">
                    {holiday.name}
                </Text>
                <Text className="text-gray-400 text-sm mt-1">
                    {holiday.date}
                </Text>
                {holiday.description && (
                    <Text className="text-gray-500 text-xs mt-1">
                        {holiday.description}
                    </Text>
                )}
            </View>

            <View className="flex-row gap-2">
                {onDelete && (
                    <DeleteButton
                        onIconClicked={(e) => {
                            e.stopPropagation();
                            onDelete(holiday);
                        }}
                    />
                )}
            </View>
        </Pressable>
    )
}

export default HolidayListItem;
