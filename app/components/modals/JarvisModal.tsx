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
                width: windowWidth * 0.75,
                backgroundColor: '#e1e9c5',
                alignSelf: 'center',
                padding: 8,
                borderRadius: 4,
            }}>
                <ModalHeader {...headerProps} />
                {children}
        </Modal>
    )
}

export default JarvisModal;