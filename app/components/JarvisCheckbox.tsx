import React from 'react';
import { View, Pressable, Text } from 'react-native';
import IconContainer, { IconType } from 'components/IconContainer';

interface JarvisCheckboxProps {
  checked: boolean;
  onToggle: () => void;
  label?: string;
}

const JarvisCheckbox: React.FC<JarvisCheckboxProps> = ({ checked, onToggle, label }) => {
  return (
    <Pressable
      onPress={onToggle}
      className="flex-row items-center space-x-2"
    >
      <View
        className={`w-5 h-5 p-3 border-2 rounded border-black items-center justify-center`}
      >
        {checked && (
            <IconContainer 
                iconProps={{
                    color: '#000000',
                    name:'check',
                    size:24,
                    type:IconType.MaterialCommunityIcons
                }}            
            />
        )}
      </View>
      {label && <Text className="text-base text-black">{label}</Text>}
    </Pressable>
  );
};

export default JarvisCheckbox;
