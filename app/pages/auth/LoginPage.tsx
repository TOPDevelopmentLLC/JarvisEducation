import { useRef } from "react";
import JarvisButton, { JarvisButtonType } from "components/buttons/JarvisButton";
import JarvisTextInput from "components/JarvisTextInput";
import { View, Image, Text } from "react-native";
import { useRouter } from "expo-router";
import BasePage from "components/pages/BasePage";
import { Images } from "assets/images";


const LoginPage = () => {
    const router = useRouter();
    const username = useRef("");
    const password = useRef("");
    const loginButtonClicked = () => {
        router.push('/pages/home');
    }
    const signUpButtonClicked = () => {
        router.push('/pages/auth/SignUpPage');
    }

    return (
        <BasePage
            className="items-center"
            displayHeader={false}>
                <View className="w-60 h-32 bg-red-200">
                    <Image
                        className="w-[10%] h-[25%]"
                        source={Images.logo}
                        resizeMode="contain"
                    />
                </View>
                <JarvisTextInput 
                    className="mt-5 w-[80%]"
                    placeholder={"Username"}         
                    onTextChange={(value) => {username.current = value}}
                />
                <JarvisTextInput 
                    className="mt-5 w-[80%]"
                    placeholder={"Password"}
                    onTextChange={(value) => {password.current = value}}
                />
                <JarvisButton 
                    className="mt-5 w-[80%]"
                    title={"Login"} 
                    onPress={loginButtonClicked} 
                />
                { false && (<View className="flex-row items-center mt-10">
                    <Text className="mr-5 text-base text-gray-300">Don't have an account yet?</Text>
                    <JarvisButton 
                        title={"Sign Up"} 
                        onPress={signUpButtonClicked} 
                        type={JarvisButtonType.transparent}
                    />
                </View>)}
        </BasePage>
    );

}

export default LoginPage;