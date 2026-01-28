import { Pressable, Text, View } from "react-native";
import { SchedulePeriod } from "lib/models/schoolYearSettings";
import clsx from "clsx";
import DeleteButton from "components/buttons/DeleteButton";


export interface SchedulePeriodListItemProps {
    className?: string;
    schedulePeriod: SchedulePeriod;
    onDelete?: (schedulePeriod: SchedulePeriod) => void;
    onPress?: (schedulePeriod: SchedulePeriod) => void;
}

const SchedulePeriodListItem = ({
    className,
    schedulePeriod,
    onDelete,
    onPress
}: SchedulePeriodListItemProps) => {
    return (
        <Pressable
            className={clsx(
                "flex-row items-center rounded-xl p-4 mb-3 justify-between active:opacity-80 bg-gray-800",
                className
            )}
            onPress={() => onPress?.(schedulePeriod)}>
            <View className="flex-1">
                <Text className="text-white text-lg font-semibold">
                    {schedulePeriod.name}
                </Text>
                <Text className="text-gray-400 text-sm mt-1">
                    {schedulePeriod.startTime} - {schedulePeriod.endTime}
                </Text>
                <Text className="text-gray-500 text-xs mt-1">
                    Period {schedulePeriod.periodNumber} - {schedulePeriod.periodType}
                </Text>
            </View>

            <View className="flex-row gap-2">
                {onDelete && (
                    <DeleteButton
                        onIconClicked={(e) => {
                            e.stopPropagation();
                            onDelete(schedulePeriod);
                        }}
                    />
                )}
            </View>
        </Pressable>
    )
}

export default SchedulePeriodListItem;
