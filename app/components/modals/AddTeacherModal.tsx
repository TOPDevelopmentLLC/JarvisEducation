import JarvisButton from "components/buttons/JarvisButton";
import { useErrorSnackbar } from "components/contexts/SnackbarContext";
import { useStoredTeacherData } from "components/contexts/TeacherContext";
import IconContainer, { IconType } from "components/IconContainer";
import JarvisCheckbox from "components/JarvisCheckbox";
import JarvisPaperTextInput from "components/JarvisPaperTextInput";
import JarvisModal from "components/modals/JarvisModal";
import { useState } from "react";
import { Text, View } from "react-native";
import { Checkbox, TextInput } from "react-native-paper";
import { apiService } from "lib/services/apiService";
import { useProfile } from "components/contexts/ProfileContext";


export interface AddTeacherModalProps {
    isVisible: boolean;
    onDismiss?: () => void;
}

const AddTeacherModal = ({
    isVisible,
    onDismiss
}: AddTeacherModalProps) => {
    const [addUserAccountIsChecked,setAddUserAccountIsChecked] = useState(false);
    const [teacherName,setTeacherName] = useState('');
    const [teacherAccountEmail,setTeacherAccountEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const showErrorMessage = useErrorSnackbar();
    const { addTeacher } = useStoredTeacherData();
    const { profile } = useProfile();

    const addButtonPressed = async () => {
        if (teacherName.length === 0) {
            showErrorMessage("Please enter the Teacher's name");
            return;
        }
        if (addUserAccountIsChecked && teacherAccountEmail.length === 0) {
            showErrorMessage('Please enter a valid email for the new Teacher.');
            return;
        }

        if (!profile?.token) {
            showErrorMessage('Authentication required. Please log in again.');
            return;
        }

        try {
            setLoading(true);

            // Call API to create teacher
            const response = await apiService.createTeacher(
                { name: teacherName },
                profile.token
            );

            // Add to local state with converted format
            addTeacher({
                teacherId: response.id.toString(),
                name: response.name
            });

            // Reset form and close modal
            setTeacherName('');
            setTeacherAccountEmail('');
            setAddUserAccountIsChecked(false);
            onDismiss?.();
        } catch (error) {
            console.error("Failed to create teacher:", error);
            showErrorMessage(error instanceof Error ? error.message : 'Failed to create teacher');
        } finally {
            setLoading(false);
        }
    }

    return (
        <JarvisModal
            headerProps={{
                title: 'Add Teacher',
                icon: {
                    type: IconType.FontAwesome6,
                    name: 'chalkboard-user',
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
                    placeholder={"Teacher Name"}
                    onTextChange={(teacherName) => setTeacherName(teacherName)}
                />
                <View className={`flex-row items-center gap-2 ${addUserAccountIsChecked ? 'my-2' : 'mt-2'}`}>
                    <JarvisCheckbox
                        checked={addUserAccountIsChecked}
                        onToggle={() => setAddUserAccountIsChecked(!addUserAccountIsChecked)}
                    />
                    <Text className="text-white">Add Teacher Account?</Text>
                </View>
                {
                    addUserAccountIsChecked && (
                        <JarvisPaperTextInput
                            placeholder="Teacher Email"
                            onTextChange={(teacherEmail) => setTeacherAccountEmail(teacherEmail)}
                        />
                    )
                }
        </JarvisModal>
    )
}

export default AddTeacherModal;