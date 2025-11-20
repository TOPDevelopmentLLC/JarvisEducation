import { View, Text, ActivityIndicator, useWindowDimensions } from "react-native";
import { Modal } from "react-native-paper";

export interface LoadingModalProps {
    isVisible: boolean;
    message?: string;
}

const LoadingModal = ({
    isVisible,
    message = "Loading..."
}: LoadingModalProps) => {
    const { width } = useWindowDimensions();
    const modalWidth = width * 0.4;

    return (
        <Modal
            visible={isVisible}
            dismissable={false}
            contentContainerStyle={{
                backgroundColor: '#374151',
                borderRadius: 16,
                padding: 32,
                width: modalWidth,
                alignSelf: 'center',
            }}>
            <View className="items-center">
                <ActivityIndicator size="large" color="#84cc16" />
                <Text className="text-white text-base text-center mt-4">{message}</Text>
            </View>
        </Modal>
    )
}

export default LoadingModal;
