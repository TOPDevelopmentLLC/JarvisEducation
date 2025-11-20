import { useState } from "react";
import BaseButton from "components/buttons/BaseButton";
import TransparentTextButton from "components/buttons/TransparentTextButton";
import JarvisTextInput from "components/JarvisTextInput";
import { View, Image, Text } from "react-native";
import { useRouter } from "expo-router";
import BasePage from "components/pages/BasePage";
import { Images } from "assets/images";
import { apiService } from "lib/services/apiService";
import LoadingModal from "components/modals/LoadingModal";
import AlertModal from "components/modals/AlertModal";
import { useProfile } from "components/contexts/ProfileContext";


const LoginPage = () => {
    const router = useRouter();
    const { setProfile } = useProfile();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const showAlert = (title: string, message: string) => {
        setAlertTitle(title);
        setAlertMessage(message);
        setAlertVisible(true);
    };

    const loginButtonClicked = async () => {
        // Validate inputs
        if (!email.trim()) {
            showAlert("Validation Error", "Please enter your email address");
            return;
        }

        if (!password.trim()) {
            showAlert("Validation Error", "Please enter your password");
            return;
        }

        try {
            setLoading(true);
            const response = await apiService.login({
                email: email.trim(),
                password: password
            });

            // Set profile with user data from response
            setProfile({
                id: response.user.id,
                email: response.user.email,
                accountType: response.user.accountType,
                token: response.user.token,
                schoolId: response.user.schoolId,
                requiresPasswordReset: response.user.requiresPasswordReset,
                fullName: response.user.fullName
            });

            console.log("Login successful:", response);

            // Check if password reset is required
            if (response.requiresPasswordReset) {
                // Navigate to change password page
                showAlert("Password Reset Required", "You need to change your password before continuing.");
                // TODO: Navigate to password change page instead
                return;
            }

            // Navigate to home page
            router.push('/pages/home');
        } catch (error) {
            console.error("Login error:", error);
            showAlert("Login Failed", error instanceof Error ? error.message : "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
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
                            placeholder="Email"
                            onTextChange={setEmail}
                        />
                        <JarvisTextInput
                            placeholder="Password"
                            secureTextEntry={true}
                            onTextChange={setPassword}
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

                <LoadingModal
                    isVisible={loading}
                    message="Logging in..."
                />

                <AlertModal
                    isVisible={alertVisible}
                    title={alertTitle}
                    message={alertMessage}
                    onConfirm={() => setAlertVisible(false)}
                />
        </BasePage>
    );

}

export default LoginPage;