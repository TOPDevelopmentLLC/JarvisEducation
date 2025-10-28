import { useErrorSnackbar, useSuccessSnackbar } from "components/contexts/SnackbarContext";
import { useStoredCodeData } from "components/contexts/CodeContext";
import { IconType } from "components/IconContainer";
import JarvisPaperTextInput from "components/JarvisPaperTextInput";
import JarvisModal from "components/modals/JarvisModal";
import { useState, useEffect } from "react";
import { Code } from "lib/models/code";


export interface EditCodeModalProps {
    isVisible: boolean;
    onDismiss?: () => void;
    code: Code | null;
}

const EditCodeModal = ({
    isVisible,
    onDismiss,
    code
}: EditCodeModalProps) => {
    const [codeName, setCodeName] = useState('');
    const [codeDescription, setCodeDescription] = useState('');
    const showErrorMessage = useErrorSnackbar();
    const showSuccessMessage = useSuccessSnackbar();
    const { updateCode } = useStoredCodeData();

    // Initialize form with code data when modal opens
    useEffect(() => {
        if (code) {
            setCodeName(code.name);
            setCodeDescription(code.description);
        }
    }, [code]);

    const saveButtonPressed = () => {
        if (!code) {
            showErrorMessage("No code selected");
            return;
        }
        if (codeName.length === 0) {
            showErrorMessage("Please enter the Code name");
            return;
        }
        if (codeDescription.length === 0) {
            showErrorMessage('Please enter a description for the Code.');
            return;
        }

        // Update the code
        updateCode({
            codeId: code.codeId,
            name: codeName,
            description: codeDescription
        });

        showSuccessMessage(`${codeName} updated successfully`);

        // Close modal
        onDismiss?.();
    }

    return (
        <JarvisModal
            headerProps={{
                title: 'Edit Code',
                icon: {
                    type: IconType.MaterialCommunityIcons,
                    name: 'shield-edit',
                    color: '#000000',
                    size: 32
                }
            }}
            isVisible={isVisible}
            onDismiss={onDismiss}
            confirmButtonProps={{
                title: "Save",
                onPress: saveButtonPressed
            }}>
                <JarvisPaperTextInput
                    placeholder={"Code Name"}
                    defaultValue={codeName}
                    onTextChange={(name) => setCodeName(name)}
                />
                <JarvisPaperTextInput
                    placeholder={"Code Description"}
                    defaultValue={codeDescription}
                    onTextChange={(description) => setCodeDescription(description)}
                    style={{
                        marginTop: 8
                    }}
                />
        </JarvisModal>
    )
}

export default EditCodeModal;
