import JarvisButton from "components/buttons/JarvisButton";
import { useErrorSnackbar } from "components/contexts/SnackbarContext";
import { IconType } from "components/IconContainer";
import JarvisPaperTextInput from "components/JarvisPaperTextInput";
import JarvisModal from "components/modals/JarvisModal";
import { useState } from "react";


export interface AddClassModalProps {
    isVisible: boolean;
    onDismiss?: () => void;
}

const AddClassModal = ({
    isVisible,
    onDismiss
}: AddClassModalProps) => {
    const [courseTitle, setCourseTitle] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const showErrorMessage = useErrorSnackbar();

    const addButtonPressed = () => {
        if (courseTitle.length === 0) {
            showErrorMessage("Please enter the Course title");
            return;
        }
        if (courseDescription.length === 0) {
            showErrorMessage('Please enter a description for the Course.');
            return;
        }
        //todo: start activity indicator
        //todo: add api call to add course
        //todo: end activity indicator on response
    }

    return (
        <JarvisModal
            headerProps={{
                title: 'Add Class',
                icon: {
                    type: IconType.FontAwesome5,
                    name: 'book',
                    color: '#000000',
                    size: 32
                }
            }}
            isVisible={isVisible}
            onDismiss={onDismiss}>
                <JarvisPaperTextInput
                    placeholder={"Course Title"}
                    onTextChange={(title) => setCourseTitle(title)}
                />
                <JarvisPaperTextInput
                    placeholder={"Course Description"}
                    onTextChange={(description) => setCourseDescription(description)}
                    style={{
                        marginTop: 8
                    }}
                    multiline
                    numberOfLines={3}
                />
                <JarvisButton className="mt-4" title={"Add"} onPress={addButtonPressed} />
                <JarvisButton className="mt-2" title={"Cancel"} onPress={onDismiss} />
        </JarvisModal>
    )
}

export default AddClassModal;
