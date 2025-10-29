import { useRef } from "react";
import BaseButton from "components/buttons/BaseButton";
import TransparentTextButton from "components/buttons/TransparentTextButton";
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
                            placeholder="Password"
                            onTextChange={(value) => {password.current = value}}
                        />

                        <BaseButton
                            className="mt-4 bg-jarvisPrimary rounded-lg items-center active:opacity-70"
                            textClassName="text-black text-base font-semibold"
                            title="Login"
                            onPress={loginButtonClicked}
                        />

                        { true && (
                            <View className="flex-row items-center justify-center mt-8">
                                <Text className="text-base text-gray-400">Don't have an account yet?</Text>
                                <TransparentTextButton
                                    className="ml-2"
                                    title="Sign Up"
                                    onPress={signUpButtonClicked}
                                />
                            </View>
                        )}
                    </View>
                </View>
        </BasePage>
    );

}

export default LoginPage;