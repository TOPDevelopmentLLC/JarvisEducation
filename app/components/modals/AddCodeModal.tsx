import { useErrorSnackbar, useSuccessSnackbar } from "components/contexts/SnackbarContext";
import { useStoredCodeData } from "components/contexts/CodeContext";
import { IconType } from "components/IconContainer";
import JarvisPaperTextInput from "components/JarvisPaperTextInput";
import JarvisModal from "components/modals/JarvisModal";
import { useState } from "react";


export interface AddCodeModalProps {
    isVisible: boolean;
    onDismiss?: () => void;
}

const AddCodeModal = ({
    isVisible,
    onDismiss
}: AddCodeModalProps) => {
    const [codeName, setCodeName] = useState('');
    const [codeDescription, setCodeDescription] = useState('');
    const showErrorMessage = useErrorSnackbar();
    const showSuccessMessage = useSuccessSnackbar();
    const { addCode, codes } = useStoredCodeData();

    const addButtonPressed = () => {
        if (codeName.length === 0) {
            showErrorMessage("Please enter the Code name");
            return;
        }
        if (codeDescription.length === 0) {
            showErrorMessage('Please enter a description for the Code.');
            return;
        }

        // Generate new ID and add code
        const newId = (codes.length + 1).toString();
        addCode({
            codeId: newId,
            name: codeName,
            description: codeDescription
        });

        showSuccessMessage(`${codeName} added successfully`);

        // Reset form and close modal
        setCodeName('');
        setCodeDescription('');
        onDismiss?.();
    }

    return (
        <JarvisModal
            headerProps={{
                title: 'Add Code',
                icon: {
                    type: IconType.MaterialCommunityIcons,
                    name: 'shield-alert',
                    color: '#000000',
                    size: 32
                }
            }}
            isVisible={isVisible}
            onDismiss={onDismiss}
            confirmButtonProps={{
                title: "Add",
                onPress: addButtonPressed
            }}>
                <JarvisPaperTextInput
                    placeholder={"Code Name"}
                    onTextChange={(name) => setCodeName(name)}
                />
                <JarvisPaperTextInput
                    placeholder={"Code Description"}
                    onTextChange={(description) => setCodeDescription(description)}
                    style={{
                        marginTop: 8
                    }}
                />
        </JarvisModal>
    )
}

export default AddCodeModal;
