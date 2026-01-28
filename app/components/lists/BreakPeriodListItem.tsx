import { Pressable, Text, View } from "react-native";
import { BreakPeriod } from "lib/models/schoolYearSettings";
import clsx from "clsx";
import DeleteButton from "components/buttons/DeleteButton";


export interface BreakPeriodListItemProps {
    className?: string;
    breakPeriod: BreakPeriod;
    onDelete?: (breakPeriod: BreakPeriod) => void;
    onPress?: (breakPeriod: BreakPeriod) => void;
}

const BreakPeriodListItem = ({
    className,
    breakPeriod,
    onDelete,
    onPress
}: BreakPeriodListItemProps) => {
    return (
        <Pressable
            className={clsx(
                "flex-row items-center rounded-xl p-4 mb-3 justify-between active:opacity-80 bg-gray-800",
                className
            )}
            onPress={() => onPress?.(breakPeriod)}>
            <View className="flex-1">
                <Text className="text-white text-lg font-semibold">
                    {breakPeriod.name}
                </Text>
                <Text className="text-gray-400 text-sm mt-1">
                    {breakPeriod.startDate} - {breakPeriod.endDate}
                </Text>
                <Text className="text-gray-500 text-xs mt-1">
                    {breakPeriod.breakType}
                </Text>
                {breakPeriod.description && (
                    <Text className="text-gray-500 text-xs mt-1">
                        {breakPeriod.description}
                    </Text>
                )}
            </View>

            <View className="flex-row gap-2">
                {onDelete && (
                    <DeleteButton
                        onIconClicked={(e) => {
                            e.stopPropagation();
                            onDelete(breakPeriod);
                        }}
                    />
                )}
            </View>
        </Pressable>
    )
}

export default BreakPeriodListItem;
