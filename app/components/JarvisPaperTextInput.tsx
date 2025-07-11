import { StyleProp, TextStyle } from "react-native";
import { TextInput } from "react-native-paper";


export interface JarvisPaperTextInputProps {
    style?: StyleProp<TextStyle>;
    placeholder: string;
    onTextChange: (string) => void;
}

const JarvisPaperTextInput = ({
    style,
    placeholder,
    onTextChange,
}: JarvisPaperTextInputProps) => {

    return (
        <TextInput 
            placeholder={placeholder}
            mode="outlined" 
            textColor="#000000"
            activeOutlineColor="#000000" 
            outlineColor="#000000"
            style={[style, {
                backgroundColor: '#FFFFFF'
            }]}
            onChangeText={(text) => onTextChange(text)}
        />
    )
}

export default JarvisPaperTextInput;