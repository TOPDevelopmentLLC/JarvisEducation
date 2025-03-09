import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';

export interface JarvisButtonProps {
    title: string;
    type?: JarvisButtonType;
    onPress: () => {}
}  

export enum JarvisButtonType {
    default,
    detail
}

const JarvisButton = ({
    title,
    type = JarvisButtonType.default,
    onPress
} : JarvisButtonProps ) => {
    const buttonAccessibilityRole="button";
    

    return (
        type === JarvisButtonType.detail ? (
            <View
                style={{margin: 5}}
            >
                <Pressable 
                    onPress={onPress}
                    accessible={true}
                    accessibilityRole={buttonAccessibilityRole}
                    accessibilityLabel={title}
                    style={
                        ({pressed}) => [
                            {
                                backgroundColor: pressed ? '#8080c2' : '#000085'
                            }, 
                            styles.detailButtonContainer
                        ]}>
                    <Text style={styles.detailButtonText}>{title}</Text>
                </Pressable>
            </View>
            ) : (
            <View
                style={{margin: 5}}
            >
                <Pressable 
                    onPress={onPress}
                    accessible={true}
                    accessibilityRole={buttonAccessibilityRole}
                    accessibilityLabel={title}
                    style={
                        ({pressed}) => [
                            {
                                backgroundColor: pressed ? '#ceda9e' : '#9cb43c'
                            }, 
                            styles.buttonContainer
                        ]}>
                    <Text style={styles.buttonText}>{title}</Text>
                </Pressable>
            </View>
        )
    );
};

export default JarvisButton;

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        borderRadius: 5,
        padding: 15,
    },
    detailButtonContainer: {
        alignItems: 'center',
        borderRadius: 5,
        padding: 5,
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
    },
    detailButtonText: {
        color: 'white',
        fontSize: 12,
    }
});