import { useErrorSnackbar, useSuccessSnackbar } from "components/contexts/SnackbarContext";
import { useProfile } from "components/contexts/ProfileContext";
import { IconType } from "components/IconContainer";
import JarvisPaperTextInput from "components/JarvisPaperTextInput";
import JarvisModal from "components/modals/JarvisModal";
import { useState } from "react";
import { schoolYearSettingsService } from "lib/services/schoolYearSettingsService";
import { SchoolYearSettings } from "lib/models/schoolYearSettings";


export interface AddTermModalProps {
    isVisible: boolean;
    onDismiss?: () => void;
    onTermAdded?: (settings: SchoolYearSettings) => void;
}

const AddTermModal = ({
    isVisible,
    onDismiss,
    onTermAdded
}: AddTermModalProps) => {
    const [name, setName] = useState('');
    const [termNumber, setTermNumber] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const showErrorMessage = useErrorSnackbar();
    const showSuccessMessage = useSuccessSnackbar();
    const { profile } = useProfile();

    const resetForm = () => {
        setName('');
        setTermNumber('');
        setStartDate('');
        setEndDate('');
    };

    const addButtonPressed = async () => {
        if (name.length === 0) {
            showErrorMessage("Please enter the term name");
            return;
        }
        if (termNumber.length === 0) {
            showErrorMessage("Please enter the term number");
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

        const termNum = parseInt(termNumber, 10);
        if (isNaN(termNum)) {
            showErrorMessage("Term number must be a valid number");
            return;
        }

        if (!profile?.token) {
            showErrorMessage("Not authenticated");
            return;
        }

        try {
            setIsLoading(true);
            const response = await schoolYearSettingsService.createTerm({
                name,
                termNumber: termNum,
                startDate,
                endDate
            }, profile.token);

            showSuccessMessage(`${name} added successfully`);
            onTermAdded?.(response.settings);
            resetForm();
            onDismiss?.();
        } catch (error) {
            showErrorMessage(error instanceof Error ? error.message : 'Failed to add term');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <JarvisModal
            headerProps={{
                title: 'Add Term',
                icon: {
                    type: IconType.MaterialCommunityIcons,
                    name: 'calendar-range',
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
                placeholder="Term Name (e.g., Fall Semester)"
                onTextChange={setName}
                defaultValue={name}
            />
            <JarvisPaperTextInput
                placeholder="Term Number (e.g., 1)"
                onTextChange={setTermNumber}
                defaultValue={termNumber}
                style={{ marginTop: 8 }}
            />
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
        </JarvisModal>
    )
}

export default AddTermModal;
