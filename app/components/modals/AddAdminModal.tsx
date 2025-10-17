import JarvisButton from "components/buttons/JarvisButton";
import { useErrorSnackbar } from "components/contexts/SnackbarContext";
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

    const addButtonPressed = () => {
        if (adminName.length === 0) {
            showErrorMessage("Please enter the Administrator's name");
            return;
        }
        if (adminAccountEmail.length === 0) {
            showErrorMessage('Please enter a valid email for the new Administrator.');
            return;
        }
        //todo: start activity indicator
        //todo: add api call to add admin
        //todo: end activity indicator on response
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
            onDismiss={onDismiss}>
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
                <JarvisButton className="mt-4" title={"Add"} onPress={addButtonPressed} />
                <JarvisButton className="mt-2" title={"Cancel"} onPress={onDismiss} />
        </JarvisModal>
    )
}

export default AddAdminModal;