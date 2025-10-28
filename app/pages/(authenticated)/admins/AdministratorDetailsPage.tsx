import { useStoredAdminData } from "components/contexts/AdminContext";
import { useStoredCodeData } from "components/contexts/CodeContext";
import DetailsHeaderPage from "components/pages/DetailsHeaderPage";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, ScrollView, Pressable } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AssignCodeModal from "components/modals/AssignCodeModal";
import JarvisButton from "components/buttons/JarvisButton";


const AdministratorDetailsPage = () => {
    const { selectedAdmin, setSelectedAdmin } = useStoredAdminData();
    const { codes } = useStoredCodeData();
    const { edit } = useLocalSearchParams();
    const [inEditMode, setEditMode] = useState<boolean>(edit === '1');
    const [currentAdminName, setCurrentAdminName] = useState(selectedAdmin.name);
    const [assignCodeModalIsVisible, setAssignCodeModalIsVisible] = useState(false);

    // Get assigned codes for this admin
    const assignedCodes = codes.filter(code =>
        selectedAdmin.assignedCodeIds?.includes(code.codeId)
    );

    const saveButtonPressed = () => {
        setEditMode(false);
        //todo: send api call
    }

    const editButtonPressed = () => {
        setEditMode(true);
    }

    const cancelButtonPressed = () => {
        setEditMode(false);
        setCurrentAdminName(selectedAdmin.name);
    }

    return (
        <DetailsHeaderPage
            title="Administrator Details"
            backButtonAction={() => setSelectedAdmin(null)}
        >
            <ScrollView className="flex-1 px-6 pt-6">
                <View className="max-w-2xl w-full mx-auto">
                    {/* Header Card */}
                    <View className="bg-gray-800 rounded-xl p-6 mb-6">
                        <View className="flex-row items-center mb-4">
                            <View className="bg-jarvisPrimary rounded-full p-3 mr-4">
                                <MaterialCommunityIcons name="shield-account" size={32} color="#000" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-gray-400 text-sm">Administrator</Text>
                                <Text className="text-white text-2xl font-bold">{selectedAdmin.name}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Details Card */}
                    <View className="bg-gray-800 rounded-xl p-6 mb-6">
                        <Text className="text-white text-xl font-bold mb-6">Information</Text>

                        {/* Full Name Field */}
                        <View className="mb-6">
                            <Text className="text-gray-400 text-sm mb-2">Full Name</Text>
                            {inEditMode ? (
                                <TextInput
                                    className="bg-gray-700 text-white rounded-lg px-4 py-3 text-base"
                                    value={currentAdminName}
                                    onChangeText={setCurrentAdminName}
                                    placeholderTextColor="#9CA3AF"
                                />
                            ) : (
                                <View className="px-4 py-3">
                                    <Text className="text-white text-base">{currentAdminName}</Text>
                                </View>
                            )}
                        </View>

                        {/* Assigned Codes Field */}
                        <View className="mb-6">
                            <Text className="text-gray-400 text-sm mb-2">Assigned Codes</Text>
                            <View className="px-4 py-3">
                                {assignedCodes.length > 0 ? (
                                    <View>
                                        {assignedCodes.map((code, index) => (
                                            <Text key={code.codeId} className="text-white text-base">
                                                {index > 0 && '\n'}
                                                • {code.name} - {code.description}
                                            </Text>
                                        ))}
                                    </View>
                                ) : (
                                    <Text className="text-white text-base">None</Text>
                                )}
                            </View>
                        </View>
                    </View>

                    {/* Action Buttons */}
                    <View className="gap-3 mb-6">
                        {inEditMode ? (
                            <>
                                <Pressable
                                    className="bg-jarvisPrimary rounded-lg p-4 items-center active:opacity-70"
                                    onPress={saveButtonPressed}>
                                    <Text className="text-black text-base font-semibold">Save Changes</Text>
                                </Pressable>
                                <Pressable
                                    className="bg-gray-700 rounded-lg p-4 items-center active:opacity-70"
                                    onPress={cancelButtonPressed}>
                                    <Text className="text-white text-base font-semibold">Cancel</Text>
                                </Pressable>
                            </>
                        ) : (
                            <>
                                <Pressable
                                    className="bg-jarvisPrimary rounded-lg p-4 items-center active:opacity-70"
                                    onPress={editButtonPressed}>
                                    <Text className="text-black text-base font-semibold">Edit Information</Text>
                                </Pressable>
                                <JarvisButton
                                    title="Assign Codes"
                                    onPress={() => setAssignCodeModalIsVisible(true)}
                                />
                            </>
                        )}
                    </View>
                </View>
            </ScrollView>
            <AssignCodeModal
                isVisible={assignCodeModalIsVisible}
                onDismiss={() => setAssignCodeModalIsVisible(false)}
                admin={selectedAdmin}
            />
        </DetailsHeaderPage>
    )
}

export default AdministratorDetailsPage;