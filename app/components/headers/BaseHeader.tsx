import { useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import IconButton, { IconButtonProps } from "components/buttons/IconButton";

interface BaseHeaderProps {
    title?: string;
    leftActionIcon?: IconButtonProps;
    rightActionIcon?: IconButtonProps;
  }
  
const BaseHeader = ({ 
    title = '', 
    leftActionIcon,
    rightActionIcon,
}: BaseHeaderProps) => {
    const router = useRouter();

    return (
        <View style={styles.header}>
            {leftActionIcon && (
                <IconButton 
                    iconProps={leftActionIcon.iconProps} 
                    onIconClicked={leftActionIcon.onIconClicked} 
                />
            )}
            <Text style={styles.title}>{title}</Text>
            {rightActionIcon && (
                <IconButton
                    iconProps={rightActionIcon.iconProps}
                    onIconClicked={rightActionIcon.onIconClicked}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
      backgroundColor: '#9cb43c',
      height: 30,
      paddingHorizontal: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
    },
});

export default BaseHeader;