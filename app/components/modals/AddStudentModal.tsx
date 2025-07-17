import JarvisButton from "components/buttons/JarvisButton";
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

    const addButtonPressed = () => {
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
                    size: 42
                }
            }}
            isVisible={isVisible}
            onDismiss={onDismiss}>
                <JarvisPaperTextInput 
                    placeholder={"Student Name"} 
                    onTextChange={(studentName) => setStudentName(studentName)}                
                />
                <View className={`flex-row items-center gap-2 ${addUserAccountIsChecked ? 'my-2' : 'mt-2'}`}>
                    <JarvisCheckbox 
                        checked={addUserAccountIsChecked} 
                        onToggle={() => setAddUserAccountIsChecked(!addUserAccountIsChecked)} 
                    />
                    <Text>Add Student Account?</Text>
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
                    <Text>Add Parent Account?</Text>
                </View>
                {
                    addParentAccountIsChecked && (
                        <JarvisPaperTextInput 
                            placeholder={"Parent Email"} 
                            onTextChange={(parentEmail) => setParentAccountEmail(parentEmail)}                        
                        />
                    )
                }
                <JarvisButton className="mt-4" title={"Add"} onPress={addButtonPressed} />
                <JarvisButton className="mt-2" title={"Cancel"} onPress={onDismiss} />
        </JarvisModal>
    )
}

export default AddStudentModal;