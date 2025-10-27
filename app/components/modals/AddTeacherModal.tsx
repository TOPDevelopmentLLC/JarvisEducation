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
    const showErrorMessage = useErrorSnackbar();
    const { addTeacher, teachers } = useStoredTeacherData();

    const addButtonPressed = () => {
        if (teacherName.length === 0) {
            showErrorMessage("Please enter the Teacher's name");
            return;
        }
        if (addUserAccountIsChecked && teacherAccountEmail.length === 0) {
            showErrorMessage('Please enter a valid email for the new Teacher.');
            return;
        }

        // Generate new ID and add teacher
        const newId = (teachers.length + 1).toString();
        addTeacher({
            teacherId: newId,
            name: teacherName
        });

        // Reset form and close modal
        setTeacherName('');
        setTeacherAccountEmail('');
        setAddUserAccountIsChecked(false);
        onDismiss?.();
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