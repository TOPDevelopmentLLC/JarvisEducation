import ModalHeader, { ModalHeaderProps } from "components/headers/ModalHeader";
import { Dimensions, ScrollView, } from "react-native";
import { Modal } from "react-native-paper";
import BaseButton, { BaseButtonProps } from "components/buttons/BaseButton";
import IconButton from "components/buttons/IconButton";
import { IconType } from "components/IconContainer";


export interface JarvisModalProps {
    headerProps: ModalHeaderProps;
    isVisible: boolean;
    onDismiss?: () => void;
    confirmButtonProps?: BaseButtonProps;
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
                <IconButton 
                    className="absolute top-4 left-4 z-10"
                    iconProps={{
                        name: 'close',
                        size: 24,
                        color: "#9CA3AF",
                        type: IconType.MaterialCommunityIcons
                    }} 
                    onIconClicked={onDismiss} 
                />

                <ScrollView
                    showsVerticalScrollIndicator={true}
                    contentContainerStyle={{ paddingBottom: 8 }}
                >
                    <ModalHeader {...headerProps} />
                    {children}
                </ScrollView>

                {confirmButtonProps && (
                    <BaseButton
                        {...confirmButtonProps}
                        className={`bg-jarvisPrimary rounded-lg items-center active:opacity-70 mt-4 ${confirmButtonProps.className || ''}`}
                        textClassName={confirmButtonProps.textClassName || "text-black text-base font-semibold"}
                    />
                )}
        </Modal>
    )
}

export default JarvisModal;