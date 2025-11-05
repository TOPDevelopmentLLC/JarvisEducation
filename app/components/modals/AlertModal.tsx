import { View, Text, useWindowDimensions } from "react-native";
import { Modal } from "react-native-paper";
import IconContainer, { IconType } from "components/IconContainer";
import BaseButton from "components/buttons/BaseButton";


export interface AlertModalProps {
    isVisible: boolean;
    title: string;
    message: string;
    confirmText?: string;
    onConfirm: () => void;
}

const AlertModal = ({
    isVisible,
    title,
    message,
    confirmText = "OK",
    onConfirm
}: AlertModalProps) => {
    const { width } = useWindowDimensions();
    const modalWidth = width * 0.5;

    return (
        <Modal
            visible={isVisible}
            onDismiss={onConfirm}
            dismissable={true}
            contentContainerStyle={{
                backgroundColor: '#374151',
                borderRadius: 16,
                padding: 24,
                width: modalWidth,
                alignSelf: 'center',
            }}>
            <View className="items-center mb-4">
                <View className="bg-yellow-600 rounded-full p-3 mb-4">
                    <IconContainer
                        iconProps={{
                            name: 'alert-circle',
                            size: 32,
                            color: '#fff',
                            type: IconType.MaterialCommunityIcons
                        }}
                    />
                </View>
                <Text className="text-white text-xl font-bold text-center mb-2">{title}</Text>
                <Text className="text-gray-400 text-base text-center">{message}</Text>
            </View>

            <View className="mt-4">
                <BaseButton
                    className="bg-jarvisPrimary rounded-lg active:opacity-70"
                    textClassName="text-black text-base font-semibold"
                    title={confirmText}
                    onPress={onConfirm}
                />
            </View>
        </Modal>
    )
}

export default AlertModal;
