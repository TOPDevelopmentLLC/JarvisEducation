import { View, Text } from "react-native";
import JarvisPaperTextInput from "./JarvisPaperTextInput";
import { useState } from "react";


export interface EditableDataFieldProps {
    title: string;
    initialValue: string;
    inEditMode: boolean;
    onValueUpdated: (updatedValue:string) => void;
}

const EditableDataField = ({
    title,
    initialValue,
    inEditMode,
    onValueUpdated,
}: EditableDataFieldProps) => {
    const [currentFieldValue,setCurrentFieldValue] = useState(initialValue);

    const handleValueOnUpdate = (updatedValue:string) => {
        setCurrentFieldValue(updatedValue);
        onValueUpdated(updatedValue);
    }

    return (
        <View className="flex-row items-center">
            <Text className="text-white">{title}</Text>
            {
                inEditMode ? (
                    <JarvisPaperTextInput 
                        defaultValue={currentFieldValue} 
                        placeholder={title} 
                        onTextChange={updatedValue => handleValueOnUpdate(updatedValue)} 
                        style={{
                            marginStart: 8
                        }}
                    />
                ) : (
                    <Text className="text-white ml-2">{initialValue}</Text>
                )
            }
        </View>
    )
}

export default EditableDataField;