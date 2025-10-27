import ModalHeader, { ModalHeaderProps } from "components/headers/ModalHeader";
import { Dimensions, ScrollView, Pressable } from "react-native";
import { Modal } from "react-native-paper";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import JarvisButton, { JarvisButtonProps } from "components/buttons/JarvisButton";


export interface JarvisModalProps {
    headerProps: ModalHeaderProps;
    isVisible: boolean;
    onDismiss?: () => void;
    confirmButtonProps?: JarvisButtonProps;
}

const JarvisModal: React.FC<React.PropsWithChildren<JarvisModalProps>> = ({
    headerProps,
    isVisible,
    onDismiss,
    confirmButtonProps,
    children
}) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    return (
        <Modal
            visible={isVisible}
            onDismiss={onDismiss}
            dismissable={true}
            contentContainerStyle={{
                width: windowWidth * 0.5,
                maxHeight: windowHeight * 0.8,
                backgroundColor: '#374151',
                alignSelf: 'center',
                padding: 24,
                borderRadius: 16,
            }}>
                {/* Close button in top left */}
                <Pressable
                    onPress={onDismiss}
                    className="absolute top-4 left-4 z-10 p-2 active:opacity-70"
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <MaterialCommunityIcons name="close" size={24} color="#9CA3AF" />
                </Pressable>

                <ScrollView
                    showsVerticalScrollIndicator={true}
                    contentContainerStyle={{ paddingBottom: 8 }}
                >
                    <ModalHeader {...headerProps} />
                    {children}
                </ScrollView>

                {confirmButtonProps && (
                    <JarvisButton {...confirmButtonProps} className="mt-4" />
                )}
        </Modal>
    )
}

export default JarvisModal;