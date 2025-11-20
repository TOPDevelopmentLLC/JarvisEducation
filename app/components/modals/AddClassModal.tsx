import JarvisButton from "components/buttons/JarvisButton";
import { useErrorSnackbar } from "components/contexts/SnackbarContext";
import { useStoredCourseData } from "components/contexts/CourseContext";
import { IconType } from "components/IconContainer";
import JarvisPaperTextInput from "components/JarvisPaperTextInput";
import JarvisModal from "components/modals/JarvisModal";
import { useState } from "react";
import { apiService } from "lib/services/apiService";
import { useProfile } from "components/contexts/ProfileContext";


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
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [loading, setLoading] = useState(false);
    const showErrorMessage = useErrorSnackbar();
    const { addCourse } = useStoredCourseData();
    const { profile } = useProfile();

    const addButtonPressed = async () => {
        if (courseTitle.length === 0) {
            showErrorMessage("Please enter the Course title");
            return;
        }
        if (courseDescription.length === 0) {
            showErrorMessage('Please enter a description for the Course.');
            return;
        }

        if (!profile?.token) {
            showErrorMessage('Authentication required. Please log in again.');
            return;
        }

        try {
            setLoading(true);

            // Call API to create course
            const response = await apiService.createCourse(
                {
                    courseName: courseTitle,
                    courseDescription: courseDescription
                },
                profile.token
            );

            // Add to local state with converted format
            addCourse({
                courseId: response.id.toString(),
                title: response.courseName,
                description: response.courseDescription,
                classroomNumber: classroomNumber.length > 0 ? classroomNumber : undefined,
                startTime: startTime.length > 0 ? startTime : undefined,
                endTime: endTime.length > 0 ? endTime : undefined
            });

            // Reset form and close modal
            setCourseTitle('');
            setCourseDescription('');
            setClassroomNumber('');
            setStartTime('');
            setEndTime('');
            onDismiss?.();
        } catch (error) {
            console.error("Failed to create course:", error);
            showErrorMessage(error instanceof Error ? error.message : 'Failed to create course');
        } finally {
            setLoading(false);
        }
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
                <JarvisPaperTextInput
                    placeholder={"Start Time (Optional)"}
                    onTextChange={(time) => setStartTime(time)}
                    style={{
                        marginTop: 8
                    }}
                />
                <JarvisPaperTextInput
                    placeholder={"End Time (Optional)"}
                    onTextChange={(time) => setEndTime(time)}
                    style={{
                        marginTop: 8
                    }}
                />
        </JarvisModal>
    )
}

export default AddClassModal;
