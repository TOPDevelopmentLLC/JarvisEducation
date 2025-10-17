import { View, Text, Pressable } from "react-native";
import { Modal } from "react-native-paper";
import { MaterialCommunityIcons } from '@expo/vector-icons';


export interface ConfirmationModalProps {
    isVisible: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationModal = ({
    isVisible,
    title,
    message,
    confirmText = "Delete",
    cancelText = "Cancel",
    onConfirm,
    onCancel
}: ConfirmationModalProps) => {
    return (
        <Modal
            visible={isVisible}
            onDismiss={onCancel}
            dismissable={true}
            contentContainerStyle={{
                backgroundColor: '#1F2937',
                marginHorizontal: 32,
                borderRadius: 16,
                padding: 24,
            }}>
            <View className="items-center mb-4">
                <View className="bg-red-600 rounded-full p-3 mb-4">
                    <MaterialCommunityIcons name="alert" size={32} color="#fff" />
                </View>
                <Text className="text-white text-xl font-bold text-center mb-2">{title}</Text>
                <Text className="text-gray-400 text-base text-center">{message}</Text>
            </View>

            <View className="gap-3 mt-4">
                <Pressable
                    className="bg-red-600 rounded-lg p-4 items-center active:opacity-70"
                    onPress={onConfirm}>
                    <Text className="text-white text-base font-semibold">{confirmText}</Text>
                </Pressable>

                <Pressable
                    className="bg-gray-700 rounded-lg p-4 items-center active:opacity-70"
                    onPress={onCancel}>
                    <Text className="text-white text-base font-semibold">{cancelText}</Text>
                </Pressable>
            </View>
        </Modal>
    )
}

export default ConfirmationModal;
