import { useErrorSnackbar, useSuccessSnackbar } from "components/contexts/SnackbarContext";
import { useProfile } from "components/contexts/ProfileContext";
import { IconType } from "components/IconContainer";
import JarvisPaperTextInput from "components/JarvisPaperTextInput";
import JarvisModal from "components/modals/JarvisModal";
import { useState } from "react";
import { schoolYearSettingsService } from "lib/services/schoolYearSettingsService";
import { SchoolYearSettings } from "lib/models/schoolYearSettings";


export interface AddHolidayModalProps {
    isVisible: boolean;
    onDismiss?: () => void;
    onHolidayAdded?: (settings: SchoolYearSettings) => void;
}

const AddHolidayModal = ({
    isVisible,
    onDismiss,
    onHolidayAdded
}: AddHolidayModalProps) => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const showErrorMessage = useErrorSnackbar();
    const showSuccessMessage = useSuccessSnackbar();
    const { profile } = useProfile();

    const resetForm = () => {
        setName('');
        setDate('');
        setDescription('');
    };

    const addButtonPressed = async () => {
        if (name.length === 0) {
            showErrorMessage("Please enter the holiday name");
            return;
        }
        if (date.length === 0) {
            showErrorMessage("Please enter the date (YYYY-MM-DD)");
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
            const response = await schoolYearSettingsService.createHoliday({
                name,
                date,
                description
            }, profile.token);

            showSuccessMessage(`${name} added successfully`);
            onHolidayAdded?.(response.settings);
            resetForm();
            onDismiss?.();
        } catch (error) {
            showErrorMessage(error instanceof Error ? error.message : 'Failed to add holiday');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <JarvisModal
            headerProps={{
                title: 'Add Holiday',
                icon: {
                    type: IconType.MaterialCommunityIcons,
                    name: 'calendar-star',
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
                placeholder="Holiday Name (e.g., Thanksgiving)"
                onTextChange={setName}
                defaultValue={name}
            />
            <JarvisPaperTextInput
                placeholder="Date (YYYY-MM-DD)"
                onTextChange={setDate}
                defaultValue={date}
                style={{ marginTop: 8 }}
            />
            <JarvisPaperTextInput
                placeholder="Description (e.g., Federal Holiday)"
                onTextChange={setDescription}
                defaultValue={description}
                style={{ marginTop: 8 }}
            />
        </JarvisModal>
    )
}

export default AddHolidayModal;
