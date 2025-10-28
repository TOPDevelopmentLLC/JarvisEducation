import JarvisButton from "components/buttons/JarvisButton";
import { useErrorSnackbar } from "components/contexts/SnackbarContext";
import { useStoredCourseData } from "components/contexts/CourseContext";
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
    const [classroomNumber, setClassroomNumber] = useState('');
    const showErrorMessage = useErrorSnackbar();
    const { addCourse, courses } = useStoredCourseData();

    const addButtonPressed = () => {
        if (courseTitle.length === 0) {
            showErrorMessage("Please enter the Course title");
            return;
        }
        if (courseDescription.length === 0) {
            showErrorMessage('Please enter a description for the Course.');
            return;
        }

        // Generate new ID and add course
        const newId = (courses.length + 1).toString();
        addCourse({
            courseId: newId,
            title: courseTitle,
            description: courseDescription,
            classroomNumber: classroomNumber.length > 0 ? classroomNumber : undefined
        });

        // Reset form and close modal
        setCourseTitle('');
        setCourseDescription('');
        setClassroomNumber('');
        onDismiss?.();
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
            onDismiss={onDismiss}
            confirmButtonProps={{
                title: "Add",
                onPress: addButtonPressed
            }}>
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
                <JarvisPaperTextInput
                    placeholder={"Classroom Number (Optional)"}
                    onTextChange={(number) => setClassroomNumber(number)}
                    style={{
                        marginTop: 8
                    }}
                />
        </JarvisModal>
    )
}

export default AddClassModal;
