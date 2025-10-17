import { Pressable, TextInput, View } from "react-native";
import IconContainer, { IconType } from "components/IconContainer";
import clsx from "clsx";


export interface SearchBarProps {
    className?: string;
    placeholder: string;
    value: string;
    onValueChanged: (newValue:string) => void;
}

const SearchBar = ({
    className,
    placeholder,
    value,
    onValueChanged,
}: SearchBarProps) => {

    return (
        <View className={clsx(className, "flex-row items-center bg-gray-800 rounded-lg")}>
            <IconContainer 
                iconProps={{
                    name: 'magnify',
                    size: 20,
                    color: '#9CA3AF',
                    type: IconType.MaterialCommunityIcons
                }} 
            />
            <TextInput
                className="flex-1 ml-2 text-white text-base"
                placeholder={placeholder}
                placeholderTextColor="#9CA3AF"
                value={value}
                onChangeText={onValueChanged}
            />
            {value.length > 0 && (
                <Pressable className="pl-2" onPress={() => onValueChanged("")}>
                    <IconContainer 
                        iconProps={{
                            name: 'close-circle',
                            color: '#9CA3AF',
                            size: 20,
                            type: IconType.MaterialCommunityIcons
                        }} 
                    />
                </Pressable>
            )}
        </View>
    )
}

export default SearchBar;