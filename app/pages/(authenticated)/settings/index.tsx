import MenuHeaderPage from "components/pages/MenuHeaderPage";
import BaseButton from "components/buttons/BaseButton";
import JarvisToggle from "components/JarvisToggle";
import { router } from 'expo-router';
import { View, ScrollView, Text } from "react-native";
import { useProfile } from "components/contexts/ProfileContext";


const SettingsPage = () => {
    const { notificationsEnabled, setNotificationsEnabled } = useProfile();

    const handleCodesPressed = () => {
        router.push('/pages/settings/CodeSettings');
    };

    return (
        <MenuHeaderPage title="Settings">
            <ScrollView className="flex-1 px-6 pt-6" contentContainerStyle={{ alignItems: 'center' }}>
                <View className="w-[60%] gap-3">
                    {/* Notifications Section */}
                    <View className="mb-4">
                        <Text className="text-white text-xl font-bold mb-3">Notifications</Text>
                        <JarvisToggle
                            label="Enable Notifications"
                            description="Receive alerts and updates"
                            value={notificationsEnabled}
                            onValueChange={setNotificationsEnabled}
                        />
                    </View>

                    {/* Other Settings Section */}
                    <View className="mt-4">
                        <Text className="text-white text-xl font-bold mb-3">Other Settings</Text>
                        <BaseButton
                            title="Codes"
                            className="bg-jarvisPrimary rounded-lg items-center active:opacity-70"
                            textClassName="text-black text-base font-semibold"
                            onPress={handleCodesPressed}
                        />
                    </View>
                </View>
            </ScrollView>
        </MenuHeaderPage>
    )
}

export default SettingsPage;