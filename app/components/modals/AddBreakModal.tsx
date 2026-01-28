import { useErrorSnackbar, useSuccessSnackbar } from "components/contexts/SnackbarContext";
import { useProfile } from "components/contexts/ProfileContext";
import { IconType } from "components/IconContainer";
import JarvisPaperTextInput from "components/JarvisPaperTextInput";
import JarvisModal from "components/modals/JarvisModal";
import { useState } from "react";
import { View, Text } from "react-native";
import { Chip } from "react-native-paper";
import { schoolYearSettingsService } from "lib/services/schoolYearSettingsService";
import { SchoolYearSettings, BreakType } from "lib/models/schoolYearSettings";


export interface AddBreakModalProps {
    isVisible: boolean;
    onDismiss?: () => void;
    onBreakAdded?: (settings: SchoolYearSettings) => void;
}

const BREAK_TYPES: BreakType[] = ['WinterBreak', 'SpringBreak', 'SummerBreak', 'FallBreak', 'ThanksgivingBreak', 'Other'];

const BREAK_TYPE_LABELS: Record<BreakType, string> = {
    'WinterBreak': 'Winter',
    'SpringBreak': 'Spring',
    'SummerBreak': 'Summer',
    'FallBreak': 'Fall',
    'ThanksgivingBreak': 'Thanksgiving',
    'Other': 'Other'
};

const AddBreakModal = ({
    isVisible,
    onDismiss,
    onBreakAdded
}: AddBreakModalProps) => {
    const [name, setName] = useState('');
    const [breakType, setBreakType] = useState<BreakType | null>(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const showErrorMessage = useErrorSnackbar();
    const showSuccessMessage = useSuccessSnackbar();
    const { profile } = useProfile();

    const resetForm = () => {
        setName('');
        setBreakType(null);
        setStartDate('');
        setEndDate('');
        setDescription('');
    };

    const addButtonPressed = async () => {
        if (name.length === 0) {
            showErrorMessage("Please enter the break name");
            return;
        }
        if (!breakType) {
            showErrorMessage("Please select a break type");
            return;
        }
        if (startDate.length === 0) {
            showErrorMessage("Please enter the start date (YYYY-MM-DD)");
            return;
        }
        if (endDate.length === 0) {
            showErrorMessage("Please enter the end date (YYYY-MM-DD)");
            return;
        }
        if (description.length === 0) {
            showErrorMessage("Please enter a description");
            return;
        }

        if (!profile?.token) {
            showErrorMessage("Not authenticated");
            return;
        }

        try {
            setIsLoading(true);
            const response = await schoolYearSettingsService.createBreakPeriod({
                name,
                breakType,
                startDate,
                endDate,
                description
            }, profile.token);

            showSuccessMessage(`${name} added successfully`);
            onBreakAdded?.(response.settings);
            resetForm();
            onDismiss?.();
        } catch (error) {
            showErrorMessage(error instanceof Error ? error.message : 'Failed to add break period');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <JarvisModal
            headerProps={{
                title: 'Add Break Period',
                icon: {
                    type: IconType.MaterialCommunityIcons,
                    name: 'beach',
                    color: '#000000',
                    size: 32
                }
            }}
            isVisible={isVisible}
            onDismiss={onDismiss}
            confirmButtonProps={{
                title: isLoading ? "Adding..." : "Add",
                onPress: addButtonPressed,
                disabled: isLoading
            }}>
            <JarvisPaperTextInput
                placeholder="Break Name (e.g., Winter Break)"
                onTextChange={setName}
                defaultValue={name}
            />

            <View className="flex-row flex-wrap items-center gap-2 mt-3 mb-2">
                <Text className="text-white font-semibold">Break Type: </Text>
                {BREAK_TYPES.map((type) => (
                    <Chip
                        key={type}
                        onPress={() => setBreakType(type)}
                        selected={breakType === type}
                        style={{
                            alignSelf: 'flex-start',
                            backgroundColor: breakType === type ? '#9cb43c' : '#374151'
                        }}
                        textStyle={{ color: breakType === type ? '#000000' : '#FFFFFF' }}
                    >
                        {BREAK_TYPE_LABELS[type]}
                    </Chip>
                ))}
            </View>

            <JarvisPaperTextInput
                placeholder="Start Date (YYYY-MM-DD)"
                onTextChange={setStartDate}
                defaultValue={startDate}
                style={{ marginTop: 8 }}
            />
            <JarvisPaperTextInput
                placeholder="End Date (YYYY-MM-DD)"
                onTextChange={setEndDate}
                defaultValue={endDate}
                style={{ marginTop: 8 }}
            />
            <JarvisPaperTextInput
                placeholder="Description (e.g., Holiday break period)"
                onTextChange={setDescription}
                defaultValue={description}
                style={{ marginTop: 8 }}
            />
        </JarvisModal>
    )
}

export default AddBreakModal;
