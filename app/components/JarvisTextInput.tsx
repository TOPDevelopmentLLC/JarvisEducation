import React, { useState } from 'react';
import { TextInput } from "react-native";

export interface JarvisTextInputProps {
    value: string;
    placeholder: string;
    autoFocus?: boolean;
    paddingLeft?: number;
    paddingRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    marginTop?: number;
    marginBottom?: number;
}

const JarvisTextInput = ({
    value,
    placeholder,
    autoFocus = false,
    paddingLeft = 0,
    paddingRight = 0,
    paddingTop = 0,
    paddingBottom = 0,
    marginLeft = 0,
    marginRight = 0,
    marginTop = 0,
    marginBottom = 0,
} : JarvisTextInputProps) => {
    const [isSelected,setSelected] = useState(autoFocus);

    return (
        <TextInput 
                placeholder={placeholder}
                value={value}
                autoFocus={autoFocus}
                onBlur={() => setSelected(false)}
                onFocus={() => setSelected(true)}
                style={[{
                    height:50,
                    width:300,
                    backgroundColor:'#ffffff',
                    borderRadius:5,
                    borderColor: isSelected ? 'blue' : 'red',
                    margin:5,
                    paddingLeft: paddingLeft ? paddingLeft : 0,
                    paddingRight: paddingRight ? paddingRight : 0,
                    paddingTop: paddingTop ? paddingTop : 0,
                    paddingBottom: paddingBottom ? paddingBottom : 0,
                    marginLeft: marginLeft ? paddingLeft : 0,
                    marginRight: marginRight ? paddingRight : 0,
                    marginTop: marginTop ? paddingTop : 0,
                    marginBottom: marginBottom ? paddingBottom : 0,
                }]}>
            </TextInput>
    )

}