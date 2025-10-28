import MenuHeaderPage from "components/pages/MenuHeaderPage";
import JarvisButton from "components/buttons/JarvisButton";
import { router } from 'expo-router';
import { View, ScrollView } from "react-native";


const SettingsPage = () => {
    const handleCodesPressed = () => {
        router.push('/pages/settings/CodeSettings');
    };

    return (
        <MenuHeaderPage title="Settings">
            <ScrollView className="flex-1 px-6 pt-6">
                <View className="gap-3">
                    <JarvisButton
                        title="Codes"
                        onPress={handleCodesPressed}
                    />
                </View>
            </ScrollView>
        </MenuHeaderPage>
    )
}

export default SettingsPage;