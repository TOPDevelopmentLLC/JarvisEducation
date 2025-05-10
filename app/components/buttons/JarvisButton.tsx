import React from 'react';
import {StyleSheet, Text, View, Pressable, ViewStyle, StyleProp} from 'react-native';

export interface JarvisButtonProps {
    title: string;
    type?: JarvisButtonType;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}  

export enum JarvisButtonType {
    default,
    detail,
    transparent
}

const JarvisButton = ({
    title,
    type = JarvisButtonType.default,
    onPress,
    style = {},
} : JarvisButtonProps ) => {
    const buttonAccessibilityRole="button";
    
    var finalButton;
    switch (type) {
        case JarvisButtonType.detail:
            finalButton = (
                <View>
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
                                styles.detailButtonContainer,
                                style
                            ]}>
                        <Text style={styles.detailButtonText}>{title}</Text>
                    </Pressable>
                </View>
            )
            break;
        case JarvisButtonType.transparent:
            finalButton = (
                <View>
                    <Pressable 
                        onPress={onPress}
                        accessible={true}
                        accessibilityRole={buttonAccessibilityRole}
                        accessibilityLabel={title}
                        style={[
                            styles.transparentButtonContainer,
                            style
                        ]}>
                        <Text style={styles.transparentButtonText}>{title}</Text>
                    </Pressable>
                </View>
            )
            break;
        default:
            finalButton = (
                <View>
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
                                styles.buttonContainer,
                                style
                            ]}>
                        <Text style={styles.buttonText}>{title}</Text>
                    </Pressable>
                </View>
            )
            break;
    }

    return finalButton;
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
    transparentButtonContainer: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,1)'
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
    },
    detailButtonText: {
        color: 'white',
        fontSize: 12,
    },
    transparentButtonText: {
        color: '#9cb43c',
        fontSize: 16,
    }
});