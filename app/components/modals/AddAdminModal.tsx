import JarvisButton from "components/buttons/JarvisButton";
import { useErrorSnackbar } from "components/contexts/SnackbarContext";
import { useStoredAdminData } from "components/contexts/AdminContext";
import IconContainer, { IconType } from "components/IconContainer";
import JarvisCheckbox from "components/JarvisCheckbox";
import JarvisPaperTextInput from "components/JarvisPaperTextInput";
import JarvisModal from "components/modals/JarvisModal";
import { useState } from "react";
import { Text, View } from "react-native";
import { Checkbox, TextInput } from "react-native-paper";


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
    const showErrorMessage = useErrorSnackbar();
    const { addAdmin, admins } = useStoredAdminData();

    const addButtonPressed = () => {
        if (adminName.length === 0) {
            showErrorMessage("Please enter the Administrator's name");
            return;
        }
        if (adminAccountEmail.length === 0) {
            showErrorMessage('Please enter a valid email for the new Administrator.');
            return;
        }

        // Generate new ID and add admin
        const newId = (admins.length + 1).toString();
        addAdmin({
            adminId: newId,
            name: adminName
        });

        // Reset form and close modal
        setAdminName('');
        setAdminAccountEmail('');
        onDismiss?.();
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