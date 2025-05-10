import React, { useState } from 'react';
import { StyleProp, TextInput, TextStyle } from "react-native";

export interface JarvisTextInputProps {
    placeholder: string;
    autoFocus?: boolean;
    style?: StyleProp<TextStyle>;
    onTextChange: (value:string) => void;
}

const JarvisTextInput = ({
    placeholder,
    autoFocus = false,
    style = {},
    onTextChange
} : JarvisTextInputProps) => {
    const [isSelected,setSelected] = useState(autoFocus);
    const [currentValue,setCurrentValue] = useState("");

    return (
        <TextInput 
            placeholder={placeholder}
            placeholderTextColor='grey'
            autoFocus={autoFocus}
            onBlur={() => setSelected(false)}
            onFocus={() => setSelected(true)}
            onChangeText={(text) => { onTextChange(text) }}
            style={[{
                height:50,
                backgroundColor:'#FFFFFF',
                borderRadius:5,
                textAlign: "left",
                color: 'black',
                paddingLeft:15
            }, style]}>
        </TextInput>
    )
}

export default JarvisTextInput;