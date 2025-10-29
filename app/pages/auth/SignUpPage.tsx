import { useRef } from "react";
import BasePage from "components/pages/BasePage";
import { Image, View, Text } from "react-native";
import { Images } from "assets/images";
import JarvisTextInput from "components/JarvisTextInput";
import BaseButton from "components/buttons/BaseButton";
import TransparentTextButton from "components/buttons/TransparentTextButton";
import { useRouter } from "expo-router";


const SignUpPage = () => {
    const router = useRouter();
    const username = useRef("");
    const email = useRef("");
    const password = useRef("");
    const confirmPassword = useRef("");

    const signUpButtonClicked = () => {
        router.push('/pages/home');
    }

    const loginButtonClicked = () => {
        router.push('/pages/auth/LoginPage');
    }

    return (
        <BasePage
            className="items-center justify-center px-8"
            displayHeader={false}>
                <View className="w-full max-w-md items-center">
                    <Image
                        source={Images.logo}
                        resizeMode="contain"
                        style={{ width: 200, height: 200, marginBottom: 48 }}
                    />

                    <View className="w-full gap-4">
                        <JarvisTextInput
                            placeholder="Username"
                            onTextChange={(value) => {username.current = value}}
                        />
                        <JarvisTextInput
                            placeholder="Email"
                            onTextChange={(value) => {email.current = value}}
                        />
                        <JarvisTextInput
                            placeholder="Password"
                            onTextChange={(value) => {password.current = value}}
                        />
                        <JarvisTextInput
                            placeholder="Confirm Password"
                            onTextChange={(value) => {confirmPassword.current = value}}
                        />

                        <BaseButton
                            className="mt-4 bg-jarvisPrimary rounded-lg items-center active:opacity-70"
                            textClassName="text-black text-base font-semibold"
                            title="Sign Up"
                            onPress={signUpButtonClicked}
                        />

                        <View className="flex-row items-center justify-center mt-8">
                            <Text className="text-base text-gray-400">Already have an account?</Text>
                            <TransparentTextButton
                                className="ml-2"
                                title="Login"
                                onPress={loginButtonClicked}
                            />
                        </View>
                    </View>
                </View>
        </BasePage>
    );

}

export default SignUpPage;