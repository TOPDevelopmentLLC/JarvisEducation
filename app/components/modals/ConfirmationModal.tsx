import { View, Text, Pressable, useWindowDimensions } from "react-native";
import { Modal } from "react-native-paper";
import IconContainer, { IconType } from "components/IconContainer";
import BaseButton from "components/buttons/BaseButton";


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
    const { width } = useWindowDimensions();
    const modalWidth = width * 0.5;

    return (
        <Modal
            visible={isVisible}
            onDismiss={onCancel}
            dismissable={true}
            contentContainerStyle={{
                backgroundColor: '#374151',
                borderRadius: 16,
                padding: 24,
                width: modalWidth,
                alignSelf: 'center',
            }}>
            <View className="items-center mb-4">
                <View className="bg-red-600 rounded-full p-3 mb-4">
                    <IconContainer 
                        iconProps={{
                            name: 'alert',
                            size: 32,
                            color: '#fff',
                            type: IconType.MaterialCommunityIcons
                        }} 
                    />
                </View>
                <Text className="text-white text-xl font-bold text-center mb-2">{title}</Text>
                <Text className="text-gray-400 text-base text-center">{message}</Text>
            </View>

            <View className="gap-3 mt-4">
                <BaseButton 
                    className="bg-red-600 rounded-lg active:opacity-70"
                    textClassName="text-white text-base font-semibold"
                    title={confirmText} 
                    onPress={onConfirm} 
                />
                <BaseButton 
                    className="bg-gray-700 rounded-lg active:opacity-70"
                    textClassName="text-white text-base font-semibold"
                    title={cancelText} 
                    onPress={onCancel} 
                />
            </View>
        </Modal>
    )
}

export default ConfirmationModal;
