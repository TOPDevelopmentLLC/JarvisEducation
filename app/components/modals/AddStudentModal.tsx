import JarvisButton from "components/buttons/JarvisButton";
import { useErrorSnackbar } from "components/contexts/SnackbarContext";
import IconContainer, { IconType } from "components/IconContainer";
import JarvisCheckbox from "components/JarvisCheckbox";
import JarvisPaperTextInput from "components/JarvisPaperTextInput";
import JarvisModal from "components/modals/JarvisModal";
import { useState } from "react";
import { Text, View } from "react-native";


export interface AddStudentModalProps {
    isVisible: boolean;
    onDismiss?: () => void;
}

const AddStudentModal = ({
    isVisible,
    onDismiss,
}: AddStudentModalProps) => {
    const [addUserAccountIsChecked,setAddUserAccountIsChecked] = useState(false);
    const [addParentAccountIsChecked,setAddParentAccountIsChecked] = useState(false);
    const [studentName,setStudentName] = useState('');
    const [studentAccountEmail,setStudentAccountEmail] = useState('');
    const [parentAccountEmail,setParentAccountEmail] = useState('');
    const showErrorMessage = useErrorSnackbar();

    const addButtonPressed = () => {
        if (studentName.length === 0) {
            showErrorMessage("Please enter the Student's name");
            return;
        }
        if (addUserAccountIsChecked && studentAccountEmail.length === 0) {
            showErrorMessage('Please enter a valid email for the new Student.');
            return;
        }
        if (addParentAccountIsChecked && parentAccountEmail.length === 0) {
            showErrorMessage('Please enter a valid email for the Parent.');
            return;
        }
        //todo: start activity indicator
        //todo: add api call to add student
        //todo: end activity indicator on response
    }

    return (
        <JarvisModal
            headerProps={{
                title: 'Add Student',
                icon: {
                    type: IconType.FontAwesome5,
                    name: 'user-graduate',
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
                    placeholder={"Student Name"}
                    onTextChange={(studentName) => setStudentName(studentName)}
                />
                <View className={`flex-row items-center gap-2 ${addUserAccountIsChecked ? 'my-2' : 'mt-2'}`}>
                    <JarvisCheckbox
                        checked={addUserAccountIsChecked}
                        onToggle={() => setAddUserAccountIsChecked(!addUserAccountIsChecked)}
                    />
                    <Text className="text-white">Add Student Account?</Text>
                </View>
                {
                    addUserAccountIsChecked && (
                        <JarvisPaperTextInput
                            placeholder="Student Email"
                            onTextChange={(studentEmail) => setStudentAccountEmail(studentEmail)}
                        />
                    )
                }
                <View className={`flex-row items-center gap-2 ${addParentAccountIsChecked ? 'my-2' : 'mt-2'}`}>
                    <JarvisCheckbox
                        checked={addParentAccountIsChecked}
                        onToggle={() => setAddParentAccountIsChecked(!addParentAccountIsChecked)}
                    />
                    <Text className="text-white">Add Parent Account?</Text>
                </View>
                {
                    addParentAccountIsChecked && (
                        <JarvisPaperTextInput
                            placeholder={"Parent Email"}
                            onTextChange={(parentEmail) => setParentAccountEmail(parentEmail)}
                        />
                    )
                }
        </JarvisModal>
    )
}

export default AddStudentModal;