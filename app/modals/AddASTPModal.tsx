import JarvisTextInput from "components/JarvisTextInput"
import { Text, View } from "react-native"


export enum AddASTPType {
    Admin = "Admin",
    Student = "Student",
    Teacher = "Teacher",
    Parent = "Parent"
}

export interface AddASTPModalProps {
    type: AddASTPType,
}

const AddASTPModal = ({
    type,
}: AddASTPModalProps) => {

    const handleTextChange = (text:string) => {

    }

    return (
        <View>
            <Text>{type.toString()}</Text>
            <JarvisTextInput 
                placeholder={"Name"} 
                onTextChange={text => handleTextChange(text)} 
            />
        </View>
    )
}

export default AddASTPModal;