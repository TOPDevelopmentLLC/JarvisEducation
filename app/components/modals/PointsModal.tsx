import { IconType } from "components/IconContainer";
import JarvisPaperTextInput from "components/JarvisPaperTextInput";
import JarvisModal from "components/modals/JarvisModal";
import { useState } from "react";
import { View } from "react-native";
import BaseButton from "components/buttons/BaseButton";


export interface PointsModalProps {
    isVisible: boolean;
    onDismiss?: () => void;
}

const PointsModal = ({
    isVisible,
    onDismiss
}: PointsModalProps) => {
    const [attitude, setAttitude] = useState('');
    const [socialization, setSocialization] = useState('');

    const handleSubmit = () => {
        // TODO: Add submit functionality to save points data

        // Reset form and close modal
        setAttitude('');
        setSocialization('');
        onDismiss?.();
    }

    const handleCancel = () => {
        // Reset form and close modal
        setAttitude('');
        setSocialization('');
        onDismiss?.();
    }

    return (
        <JarvisModal
            headerProps={{
                title: 'Points',
                icon: {
                    type: IconType.MaterialCommunityIcons,
                    name: 'star',
                    color: '#000000',
                    size: 32
                }
            }}
            isVisible={isVisible}
            onDismiss={onDismiss}>
                <JarvisPaperTextInput
                    placeholder={"Attitude"}
                    onTextChange={(text) => setAttitude(text)}
                    value={attitude}
                />
                <JarvisPaperTextInput
                    placeholder={"Socialization"}
                    onTextChange={(text) => setSocialization(text)}
                    value={socialization}
                    style={{
                        marginTop: 8
                    }}
                />

                {/* Action Buttons */}
                <View className="gap-3 mt-4">
                    <BaseButton
                        title="Submit"
                        className="bg-jarvisPrimary rounded-lg items-center active:opacity-70"
                        textClassName="text-black text-base font-semibold"
                        onPress={handleSubmit}
                    />
                    <BaseButton
                        title="Cancel"
                        className="bg-gray-700 rounded-lg items-center active:opacity-70"
                        textClassName="text-white text-base font-semibold"
                        onPress={handleCancel}
                    />
                </View>
        </JarvisModal>
    )
}

export default PointsModal;
