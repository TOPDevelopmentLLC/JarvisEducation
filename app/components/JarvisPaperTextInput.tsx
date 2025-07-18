import { useState } from "react";
import { StyleProp, TextStyle } from "react-native";
import { TextInput } from "react-native-paper";


export interface JarvisPaperTextInputProps {
    style?: StyleProp<TextStyle>;
    defaultValue?: string;
    placeholder: string;
    onTextChange: (string) => void;
    disabled?: boolean;
    multiline?: boolean;
}

const JarvisPaperTextInput = ({
    style,
    defaultValue,
    placeholder,
    onTextChange,
    disabled = false,
    multiline = false,
}: JarvisPaperTextInputProps) => {
    const [inputHeight, setInputHeight] = useState(0);

    return (
        <TextInput 
            placeholder={placeholder}
            mode="outlined" 
            textColor="#000000"
            activeOutlineColor="#000000" 
            outlineColor="#000000"
            style={[style, {
                backgroundColor: '#FFFFFF',
                height: Math.max(multiline ? 100 : 40, inputHeight),
            }]}
            value={defaultValue}
            onChangeText={(text) => onTextChange(text)}
            disabled={disabled}
            editable={!disabled}
            multiline={multiline}
            onContentSizeChange={(e) =>
                setInputHeight(e.nativeEvent.contentSize.height)
            }
        />
    )
}

export default JarvisPaperTextInput;