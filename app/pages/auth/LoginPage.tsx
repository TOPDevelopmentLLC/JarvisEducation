import { useRef, useState } from "react";
import JarvisButton, { JarvisButtonType } from "components/buttons/JarvisButton";
import JarvisTextInput from "components/JarvisTextInput";
import { View, Image, Text, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import BasePage from "components/pages/BasePage";


const LoginPage = () => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const router = useRouter();
    const username = useRef("");
    const password = useRef("");
    const loginButtonClicked = () => {
        router.push('/pages/HomePage');
    }
    const signUpButtonClicked = () => {
        router.push('/pages/auth/SignUpPage');
    }

    return (
        <BasePage
            backgroundColor={'#000000'}
            displayHeader={false}
            style={{
                alignItems: "center", 
                justifyContent: "center",
            }}
        >
            <Image 
                source={require('../assets/images/NegativeJarvisEdLogo.png')}
                style={{ width: 200, height: 150 }} 
            />
            <JarvisTextInput 
                placeholder={"Username"}  
                style={{
                    width: windowWidth * 0.8,
                    marginTop: 10,
                }}          
                onTextChange={(value) => {username.current = value}}
            />
            <JarvisTextInput 
                placeholder={"Password"}  
                style={{
                    width: windowWidth * 0.8,
                    marginTop: 10,
                }}          
                onTextChange={(value) => {password.current = value}}
            />
            <JarvisButton 
                title={"Login"} 
                onPress={loginButtonClicked} 
                style={{
                    width: windowWidth * 0.8,
                    marginTop: 10,
                }}
            />
            <View
                style={{
                    flexDirection: "row",
                    marginTop: 20
                }}
            >
                <Text style={{
                    color: 'lightgray',
                    marginRight: 10,
                    fontSize: 16
                }}>Don't have an account yet?</Text>
                <JarvisButton 
                title={"Sign Up"} 
                onPress={signUpButtonClicked} 
                type={JarvisButtonType.transparent}
            />
            </View>
        </BasePage>
    );

}

export default LoginPage;