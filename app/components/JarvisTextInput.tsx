import clsx from 'clsx';
import React, { useState } from 'react';
import { TextInput } from "react-native";

export interface JarvisTextInputProps {
    className?: string;
    placeholder: string;
    autoFocus?: boolean;
    onTextChange: (value:string) => void;
}

const JarvisTextInput = ({
    className,
    placeholder,
    autoFocus = false,
    onTextChange
} : JarvisTextInputProps) => {
    const [isSelected,setSelected] = useState(autoFocus);
    const [currentValue,setCurrentValue] = useState("");

    return (
        <TextInput 
            className={clsx(className, 'rounded-lg pl-8 text-black text-left h-12 bg-white')}
            placeholder={placeholder}
            placeholderTextColor='grey'
            autoFocus={autoFocus}
            onBlur={() => setSelected(false)}
            onFocus={() => setSelected(true)}
            onChangeText={(text) => { onTextChange(text) }}
        />
    )
}

export default JarvisTextInput;