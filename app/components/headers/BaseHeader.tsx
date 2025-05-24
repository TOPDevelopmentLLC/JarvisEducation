import { useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import IconButton, { IconButtonProps } from "components/buttons/IconButton";

interface BaseHeaderProps {
    title?: string;
    leftActionIcon?: IconButtonProps|undefined;
    rightActionIcon?: IconButtonProps|undefined;
  }
  
const BaseHeader = ({ 
    title = '', 
    leftActionIcon,
    rightActionIcon,
}: BaseHeaderProps) => {
    const router = useRouter();

    return (
        <View style={styles.header}>
            <View style={{ flex: 1 }}>
                {leftActionIcon && (
                    <IconButton 
                        iconProps={leftActionIcon.iconProps} 
                        onIconClicked={leftActionIcon.onIconClicked} 
                    />
                )}
            </View>
            <Text style={styles.title}>{title}</Text>
            <View style={{ flex: 1 }}>
                {rightActionIcon && (
                    <IconButton
                        iconProps={rightActionIcon.iconProps}
                        onIconClicked={rightActionIcon.onIconClicked}
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
      backgroundColor: '#9cb43c',
      paddingHorizontal: 15,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      alignSelf: 'center',
      verticalAlign: 'middle'
    },
});

export default BaseHeader;