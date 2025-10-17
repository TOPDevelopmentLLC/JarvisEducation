import ModalHeader, { ModalHeaderProps } from "components/headers/ModalHeader";
import { Dimensions } from "react-native";
import { Modal } from "react-native-paper";


export interface JarvisModalProps {
    headerProps: ModalHeaderProps;
    isVisible: boolean;
    onDismiss?: () => void;
}

const JarvisModal: React.FC<React.PropsWithChildren<JarvisModalProps>> = ({
    headerProps,
    isVisible,
    onDismiss,
    children
}) => {
    const windowWidth = Dimensions.get('window').width;

    return (
        <Modal
            visible={isVisible}
            onDismiss={onDismiss}
            dismissable={true}
            contentContainerStyle={{
                width: windowWidth * 0.5,
                backgroundColor: '#374151',
                alignSelf: 'center',
                padding: 24,
                borderRadius: 16,
            }}>
                <ModalHeader {...headerProps} />
                {children}
        </Modal>
    )
}

export default JarvisModal;