import { useStoredAdminData } from "components/contexts/AdminContext";
import { useStoredCodeData } from "components/contexts/CodeContext";
import DetailsHeaderPage from "components/pages/DetailsHeaderPage";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, ScrollView, Pressable } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AssignCodeModal from "components/modals/AssignCodeModal";
import ConfirmationModal from "components/modals/ConfirmationModal";
import JarvisButton from "components/buttons/JarvisButton";
import { Code } from "lib/models/code";


const AdministratorDetailsPage = () => {
    const { selectedAdmin, setSelectedAdmin, unassignCodeFromAdmin } = useStoredAdminData();
    const { codes } = useStoredCodeData();
    const { edit } = useLocalSearchParams();
    const [inEditMode, setEditMode] = useState<boolean>(edit === '1');
    const [currentAdminName, setCurrentAdminName] = useState(selectedAdmin.name);
    const [assignCodeModalIsVisible, setAssignCodeModalIsVisible] = useState(false);
    const [confirmDeleteCodeModalIsVisible, setConfirmDeleteCodeModalIsVisible] = useState(false);
    const [codeToRemove, setCodeToRemove] = useState<Code | null>(null);

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

    const handleRemoveCode = (code: Code) => {
        setCodeToRemove(code);
        setConfirmDeleteCodeModalIsVisible(true);
    }

    const confirmRemoveCode = () => {
        if (codeToRemove && selectedAdmin) {
            unassignCodeFromAdmin(selectedAdmin.adminId, codeToRemove.codeId);
        }
        setConfirmDeleteCodeModalIsVisible(false);
        setCodeToRemove(null);
    }

    const cancelRemoveCode = () => {
        setConfirmDeleteCodeModalIsVisible(false);
        setCodeToRemove(null);
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
                                            <View key={code.codeId} className="flex-row items-center justify-between mb-2">
                                                <Text className="text-white text-base flex-1">
                                                    • {code.name} - {code.description}
                                                </Text>
                                                {inEditMode && (
                                                    <Pressable
                                                        className="bg-red-600 rounded-lg p-2 active:opacity-70 ml-2"
                                                        onPress={() => handleRemoveCode(code)}>
                                                        <MaterialCommunityIcons name="delete" size={16} color="#fff" />
                                                    </Pressable>
                                                )}
                                            </View>
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
            <ConfirmationModal
                isVisible={confirmDeleteCodeModalIsVisible}
                title="Remove Code"
                message={`Are you sure you want to remove ${codeToRemove?.name} from ${selectedAdmin.name}?`}
                confirmText="Remove"
                cancelText="Cancel"
                onConfirm={confirmRemoveCode}
                onCancel={cancelRemoveCode}
            />
        </DetailsHeaderPage>
    )
}

export default AdministratorDetailsPage;