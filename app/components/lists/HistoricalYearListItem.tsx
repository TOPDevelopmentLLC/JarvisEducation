import { Pressable, Text, View } from "react-native";
import { SchoolYearSettings } from "lib/models/schoolYearSettings";
import clsx from "clsx";
import IconContainer, { IconType } from "components/IconContainer";


export interface HistoricalYearListItemProps {
    className?: string;
    settings: SchoolYearSettings;
    onPress?: (settings: SchoolYearSettings) => void;
}

const HistoricalYearListItem = ({
    className,
    settings,
    onPress
}: HistoricalYearListItemProps) => {
    return (
        <Pressable
            className={clsx(
                "flex-row items-center rounded-xl p-4 mb-3 justify-between active:opacity-80 bg-gray-800",
                className
            )}
            onPress={() => onPress?.(settings)}>
            <View className="flex-1">
                <Text className="text-white text-lg font-semibold">
                    {settings.name}
                </Text>
                <Text className="text-gray-400 text-sm mt-1">
                    {settings.startDate || 'Start date not set'} - {settings.endDate || 'End date not set'}
                </Text>
                <Text className="text-gray-500 text-xs mt-1">
                    {settings.termType} | {settings.terms.length} terms | {settings.holidays.length} holidays
                </Text>
            </View>

            <View className="flex-row gap-2">
                <IconContainer
                    iconProps={{
                        name: 'chevron-right',
                        size: 24,
                        color: "#9cb43c",
                        type: IconType.MaterialCommunityIcons
                    }}
                />
            </View>
        </Pressable>
    )
}

export default HistoricalYearListItem;
