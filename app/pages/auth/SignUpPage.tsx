import { useState } from "react";
import BasePage from "components/pages/BasePage";
import { Image, View, Text } from "react-native";
import { Images } from "assets/images";
import JarvisTextInput from "components/JarvisTextInput";
import BaseButton from "components/buttons/BaseButton";
import TransparentTextButton from "components/buttons/TransparentTextButton";
import { useRouter } from "expo-router";
import { apiService } from "lib/services/apiService";
import LoadingModal from "components/modals/LoadingModal";
import AlertModal from "components/modals/AlertModal";
import { useProfile } from "components/contexts/ProfileContext";


const SignUpPage = () => {
    const router = useRouter();
    const { setProfile } = useProfile();
    const [username, setUsername] = useState("");
    const [schoolName, setSchoolName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const showAlert = (title: string, message: string) => {
        setAlertTitle(title);
        setAlertMessage(message);
        setAlertVisible(true);
    };

    const signUpButtonClicked = async () => {
        // Validate inputs
        if (!username.trim()) {
            showAlert("Validation Error", "Please enter a username");
            return;
        }

        if (!schoolName.trim()) {
            showAlert("Validation Error", "Please enter a school name");
            return;
        }

        if (!email.trim()) {
            showAlert("Validation Error", "Please enter an email address");
            return;
        }

        if (!password.trim()) {
            showAlert("Validation Error", "Please enter a password");
            return;
        }

        if (password !== confirmPassword) {
            showAlert("Validation Error", "Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            const response = await apiService.signUp({
                email: email.trim(),
                password: password,
                schoolName: schoolName.trim()
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

            console.log("Sign up successful:", response);

            // Navigate to home page
            router.push('/pages/home');
        } catch (error) {
            console.error("Sign up error:", error);
            showAlert("Sign Up Failed", error instanceof Error ? error.message : "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
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
                            onTextChange={setUsername}
                        />
                        <JarvisTextInput
                            placeholder="School Name"
                            onTextChange={setSchoolName}
                        />
                        <JarvisTextInput
                            placeholder="Email"
                            onTextChange={setEmail}
                        />
                        <JarvisTextInput
                            placeholder="Password"
                            secureTextEntry={true}
                            onTextChange={setPassword}
                        />
                        <JarvisTextInput
                            placeholder="Confirm Password"
                            secureTextEntry={true}
                            onTextChange={setConfirmPassword}
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

                <LoadingModal
                    isVisible={loading}
                    message="Creating your account..."
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

export default SignUpPage;