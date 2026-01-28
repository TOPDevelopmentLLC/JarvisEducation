import MenuHeaderPage from "components/pages/MenuHeaderPage";
import { View, Text, ScrollView } from "react-native";
import { useHistoricalYear } from "components/contexts/HistoricalYearContext";
import TermList from "components/lists/TermList";
import HolidayList from "components/lists/HolidayList";
import BreakPeriodList from "components/lists/BreakPeriodList";
import SchedulePeriodList from "components/lists/SchedulePeriodList";


const HistoricalYearDetailsPage = () => {
    const { selectedHistoricalYear: settings } = useHistoricalYear();

    if (!settings) {
        return (
            <MenuHeaderPage title="Historical Year Details">
                <View className="flex-1 justify-center items-center">
                    <Text className="text-gray-400 text-base">Historical year not found</Text>
                </View>
            </MenuHeaderPage>
        );
    }

    return (
        <MenuHeaderPage title="Historical Year Details">
            <ScrollView className="flex-1 px-6 pt-6" contentContainerStyle={{ alignItems: 'center', paddingBottom: 24 }}>
                <View className="w-[60%]">
                    {/* School Year Info */}
                    <View className="bg-gray-800 rounded-xl p-4 mb-6">
                        <Text className="text-white text-2xl font-bold">{settings.name}</Text>
                        <Text className="text-gray-400 text-sm mt-2">
                            {settings.startDate || 'Start date not set'} - {settings.endDate || 'End date not set'}
                        </Text>
                        <Text className="text-gray-400 text-sm mt-1">
                            Term Type: {settings.termType}
                        </Text>
                        <Text className="text-gray-400 text-sm mt-1">
                            School Day: {settings.schoolDayStart || 'Not set'} - {settings.schoolDayEnd || 'Not set'}
                        </Text>
                        <Text className="text-gray-400 text-sm mt-1">
                            Timezone: {settings.timezone}
                        </Text>
                    </View>

                    {/* Terms Section */}
                    <View className="mb-6">
                        <Text className="text-white text-xl font-bold mb-4">Terms</Text>
                        {settings.terms.length > 0 ? (
                            <TermList terms={settings.terms} />
                        ) : (
                            <Text className="text-gray-400 text-base">No terms</Text>
                        )}
                    </View>

                    {/* Holidays Section */}
                    <View className="mb-6">
                        <Text className="text-white text-xl font-bold mb-4">Holidays</Text>
                        {settings.holidays.length > 0 ? (
                            <HolidayList holidays={settings.holidays} />
                        ) : (
                            <Text className="text-gray-400 text-base">No holidays</Text>
                        )}
                    </View>

                    {/* Break Periods Section */}
                    <View className="mb-6">
                        <Text className="text-white text-xl font-bold mb-4">Break Periods</Text>
                        {settings.breakPeriods.length > 0 ? (
                            <BreakPeriodList breakPeriods={settings.breakPeriods} />
                        ) : (
                            <Text className="text-gray-400 text-base">No break periods</Text>
                        )}
                    </View>

                    {/* Schedule Periods Section */}
                    <View className="mb-6">
                        <Text className="text-white text-xl font-bold mb-4">Schedule Periods</Text>
                        {settings.schedulePeriods.length > 0 ? (
                            <SchedulePeriodList schedulePeriods={settings.schedulePeriods} />
                        ) : (
                            <Text className="text-gray-400 text-base">No schedule periods</Text>
                        )}
                    </View>
                </View>
            </ScrollView>
        </MenuHeaderPage>
    )
}

export default HistoricalYearDetailsPage;
