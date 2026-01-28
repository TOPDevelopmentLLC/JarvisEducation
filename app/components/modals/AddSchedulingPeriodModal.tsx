import { useErrorSnackbar, useSuccessSnackbar } from "components/contexts/SnackbarContext";
import { useProfile } from "components/contexts/ProfileContext";
import { IconType } from "components/IconContainer";
import JarvisPaperTextInput from "components/JarvisPaperTextInput";
import JarvisModal from "components/modals/JarvisModal";
import { useState } from "react";
import { View, Text } from "react-native";
import { Chip } from "react-native-paper";
import { schoolYearSettingsService } from "lib/services/schoolYearSettingsService";
import { SchoolYearSettings, PeriodType } from "lib/models/schoolYearSettings";


export interface AddSchedulingPeriodModalProps {
    isVisible: boolean;
    onDismiss?: () => void;
    onPeriodAdded?: (settings: SchoolYearSettings) => void;
}

const PERIOD_TYPES: PeriodType[] = ['Class', 'Lunch', 'Homeroom', 'Passing', 'Assembly', 'Other'];

const AddSchedulingPeriodModal = ({
    isVisible,
    onDismiss,
    onPeriodAdded
}: AddSchedulingPeriodModalProps) => {
    const [name, setName] = useState('');
    const [periodNumber, setPeriodNumber] = useState('');
    const [periodType, setPeriodType] = useState<PeriodType | null>(null);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const showErrorMessage = useErrorSnackbar();
    const showSuccessMessage = useSuccessSnackbar();
    const { profile } = useProfile();

    const resetForm = () => {
        setName('');
        setPeriodNumber('');
        setPeriodType(null);
        setStartTime('');
        setEndTime('');
    };

    const addButtonPressed = async () => {
        if (name.length === 0) {
            showErrorMessage("Please enter the period name");
            return;
        }
        if (periodNumber.length === 0) {
            showErrorMessage("Please enter the period number");
            return;
        }
        if (!periodType) {
            showErrorMessage("Please select a period type");
            return;
        }
        if (startTime.length === 0) {
            showErrorMessage("Please enter the start time (HH:mm:ss)");
            return;
        }
        if (endTime.length === 0) {
            showErrorMessage("Please enter the end time (HH:mm:ss)");
            return;
        }

        const periodNum = parseInt(periodNumber, 10);
        if (isNaN(periodNum)) {
            showErrorMessage("Period number must be a valid number");
            return;
        }

        if (!profile?.token) {
            showErrorMessage("Not authenticated");
            return;
        }

        try {
            setIsLoading(true);
            const response = await schoolYearSettingsService.createSchedulePeriod({
                name,
                periodNumber: periodNum,
                periodType,
                startTime,
                endTime
            }, profile.token);

            showSuccessMessage(`${name} added successfully`);
            onPeriodAdded?.(response.settings);
            resetForm();
            onDismiss?.();
        } catch (error) {
            showErrorMessage(error instanceof Error ? error.message : 'Failed to add schedule period');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <JarvisModal
            headerProps={{
                title: 'Add Schedule Period',
                icon: {
                    type: IconType.MaterialCommunityIcons,
                    name: 'clock-outline',
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
                placeholder="Period Name (e.g., Period 1)"
                onTextChange={setName}
                defaultValue={name}
            />
            <JarvisPaperTextInput
                placeholder="Period Number (e.g., 1)"
                onTextChange={setPeriodNumber}
                defaultValue={periodNumber}
                style={{ marginTop: 8 }}
            />

            <View className="flex-row flex-wrap items-center gap-2 mt-3 mb-2">
                <Text className="text-white font-semibold">Period Type: </Text>
                {PERIOD_TYPES.map((type) => (
                    <Chip
                        key={type}
                        onPress={() => setPeriodType(type)}
                        selected={periodType === type}
                        style={{
                            alignSelf: 'flex-start',
                            backgroundColor: periodType === type ? '#9cb43c' : '#374151'
                        }}
                        textStyle={{ color: periodType === type ? '#000000' : '#FFFFFF' }}
                    >
                        {type}
                    </Chip>
                ))}
            </View>

            <JarvisPaperTextInput
                placeholder="Start Time (HH:mm:ss)"
                onTextChange={setStartTime}
                defaultValue={startTime}
                style={{ marginTop: 8 }}
            />
            <JarvisPaperTextInput
                placeholder="End Time (HH:mm:ss)"
                onTextChange={setEndTime}
                defaultValue={endTime}
                style={{ marginTop: 8 }}
            />
        </JarvisModal>
    )
}

export default AddSchedulingPeriodModal;
