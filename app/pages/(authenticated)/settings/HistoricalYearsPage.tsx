import MenuHeaderPage from "components/pages/MenuHeaderPage";
import { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { useProfile } from "components/contexts/ProfileContext";
import { useErrorSnackbar } from "components/contexts/SnackbarContext";
import { useHistoricalYear } from "components/contexts/HistoricalYearContext";
import { schoolYearSettingsService } from "lib/services/schoolYearSettingsService";
import { SchoolYearSettings } from "lib/models/schoolYearSettings";
import HistoricalYearsList from "components/lists/HistoricalYearsList";


const HistoricalYearsPage = () => {
    const { profile } = useProfile();
    const showErrorMessage = useErrorSnackbar();
    const { setSelectedHistoricalYear } = useHistoricalYear();

    const [historicalYears, setHistoricalYears] = useState<SchoolYearSettings[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchHistoricalSettings();
    }, []);

    const fetchHistoricalSettings = async () => {
        if (!profile?.token) {
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            const response = await schoolYearSettingsService.getHistoricalSettings(profile.token);
            setHistoricalYears(response.settings);
        } catch (error) {
            showErrorMessage(error instanceof Error ? error.message : 'Failed to fetch historical years');
        } finally {
            setIsLoading(false);
        }
    };

    const handleHistoricalYearPressed = (settings: SchoolYearSettings) => {
        setSelectedHistoricalYear(settings);
        router.push('/pages/settings/HistoricalYearDetailsPage');
    };

    if (isLoading) {
        return (
            <MenuHeaderPage title="Historical Years">
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#9cb43c" />
                </View>
            </MenuHeaderPage>
        );
    }

    return (
        <MenuHeaderPage title="Historical Years">
            <View className="flex-1 px-6 pt-6 items-center">
                <View className="w-[60%] flex-1">
                    <Text className="text-white text-2xl font-bold mb-4">Past School Years</Text>
                    {historicalYears.length > 0 ? (
                        <HistoricalYearsList
                            historicalYears={historicalYears}
                            historicalYearItemPressed={handleHistoricalYearPressed}
                        />
                    ) : (
                        <View className="flex-1 justify-center items-center">
                            <Text className="text-gray-400 text-base">No historical years available</Text>
                        </View>
                    )}
                </View>
            </View>
        </MenuHeaderPage>
    )
}

export default HistoricalYearsPage;
