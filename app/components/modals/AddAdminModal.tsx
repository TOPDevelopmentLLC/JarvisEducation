import JarvisButton from "components/buttons/JarvisButton";
import { useErrorSnackbar } from "components/contexts/SnackbarContext";
import { useStoredAdminData } from "components/contexts/AdminContext";
import IconContainer, { IconType } from "components/IconContainer";
import JarvisCheckbox from "components/JarvisCheckbox";
import JarvisPaperTextInput from "components/JarvisPaperTextInput";
import JarvisModal from "components/modals/JarvisModal";
import { useState } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { Checkbox, TextInput } from "react-native-paper";
import { apiService } from "lib/services/apiService";
import { useProfile } from "components/contexts/ProfileContext";


export interface AddAdminModalProps {
    isVisible: boolean;
    onDismiss?: () => void;
}

const AddAdminModal = ({
    isVisible,
    onDismiss
}: AddAdminModalProps) => {
    const [addUserAccountIsChecked,setAddUserAccountIsChecked] = useState(false);
    const [adminName,setAdminName] = useState('');
    const [adminAccountEmail,setAdminAccountEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const showErrorMessage = useErrorSnackbar();
    const { addAdmin } = useStoredAdminData();
    const { profile } = useProfile();

    const addButtonPressed = async () => {
        if (adminName.length === 0) {
            showErrorMessage("Please enter the Administrator's name");
            return;
        }
        if (adminAccountEmail.length === 0) {
            showErrorMessage('Please enter a valid email for the new Administrator.');
            return;
        }

        if (!profile?.token) {
            showErrorMessage('Authentication required. Please log in again.');
            return;
        }

        try {
            setLoading(true);

            // Call API to create administrator
            const response = await apiService.createAdministrator(
                { name: adminName },
                profile.token
            );

            // Add to local state with converted format
            addAdmin({
                adminId: response.id.toString(),
                name: response.name
            });

            // Reset form and close modal
            setAdminName('');
            setAdminAccountEmail('');
            onDismiss?.();
        } catch (error) {
            console.error("Failed to create administrator:", error);
            showErrorMessage(error instanceof Error ? error.message : 'Failed to create administrator');
        } finally {
            setLoading(false);
        }
    }

    return (
        <JarvisModal
            headerProps={{
                title: 'Add Admin',
                icon: {
                    type: IconType.FontAwesome6,
                    name: 'user-tie',
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
                    placeholder={"Admin Name"}
                    onTextChange={(adminName) => setAdminName(adminName)}
                />
                <JarvisPaperTextInput
                    placeholder={"Admin Email"}
                    onTextChange={(adminEmail) => setAdminAccountEmail(adminEmail)}
                    style={{
                        marginTop: 8
                    }}
                />
        </JarvisModal>
    )
}

export default AddAdminModal;