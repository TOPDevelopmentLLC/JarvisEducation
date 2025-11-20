import JarvisButton from "components/buttons/JarvisButton";
import { useErrorSnackbar } from "components/contexts/SnackbarContext";
import { useStoredStudentData } from "components/contexts/StudentContext";
import IconContainer, { IconType } from "components/IconContainer";
import JarvisCheckbox from "components/JarvisCheckbox";
import JarvisPaperTextInput from "components/JarvisPaperTextInput";
import JarvisModal from "components/modals/JarvisModal";
import { useState } from "react";
import { Text, View } from "react-native";
import { apiService } from "lib/services/apiService";
import { useProfile } from "components/contexts/ProfileContext";


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
    const [loading, setLoading] = useState(false);
    const showErrorMessage = useErrorSnackbar();
    const { addStudent } = useStoredStudentData();
    const { profile } = useProfile();

    const addButtonPressed = async () => {
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

        if (!profile?.token) {
            showErrorMessage('Authentication required. Please log in again.');
            return;
        }

        try {
            setLoading(true);

            // Call API to create student
            const response = await apiService.createStudent(
                { name: studentName },
                profile.token
            );

            // Add to local state with converted format
            addStudent({
                studentId: response.id.toString(),
                name: response.name
            });

            // Reset form and close modal
            setStudentName('');
            setStudentAccountEmail('');
            setParentAccountEmail('');
            setAddUserAccountIsChecked(false);
            setAddParentAccountIsChecked(false);
            onDismiss?.();
        } catch (error) {
            console.error("Failed to create student:", error);
            showErrorMessage(error instanceof Error ? error.message : 'Failed to create student');
        } finally {
            setLoading(false);
        }
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