import { View, Text, Dimensions } from "react-native";
import JarvisModal from "./JarvisModal";
import { IconType } from "components/IconContainer";
import { useState } from "react";
import TeacherList from "components/lists/TeacherList";
import { useStoredTeacherData } from "components/contexts/TeacherContext";
import { useStoredCourseData } from "components/contexts/CourseContext";
import { useErrorSnackbar, useSuccessSnackbar } from "components/contexts/SnackbarContext";
import { Teacher } from "lib/models/teacher";
import { Course } from "lib/models/course";


export interface AssignTeacherModalProps {
    isVisible: boolean;
    onDismiss?: () => void;
    course: Course | null;
}

const AssignTeacherModal = ({
    isVisible,
    onDismiss,
    course,
}: AssignTeacherModalProps) => {
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
    const showErrorMessage = useErrorSnackbar();
    const showSuccessMessage = useSuccessSnackbar();
    const { teachers, assignTeacherToCourse: assignTeacherToCourseInTeacherContext, unassignTeacherFromCourse } = useStoredTeacherData();
    const { assignTeacherToCourse: assignTeacherToCourseInCourseContext } = useStoredCourseData();
    const windowHeight = Dimensions.get('window').height;

    const handleAssignTeacher = () => {
        if (!selectedTeacher) {
            showErrorMessage('Please select a teacher to assign.');
            return;
        }
        if (!course) {
            showErrorMessage('No course selected.');
            return;
        }

        // If there's already a teacher assigned to this course, remove the course from their assignedCourseIds
        if (course.assignedTeacherId) {
            unassignTeacherFromCourse(course.assignedTeacherId, course.courseId);
        }

        // Assign teacher to course in both contexts
        assignTeacherToCourseInTeacherContext(selectedTeacher.teacherId, course.courseId);
        assignTeacherToCourseInCourseContext(course.courseId, selectedTeacher.teacherId);
        showSuccessMessage(`${selectedTeacher.name} assigned to ${course.title}`);

        // Reset and close
        setSelectedTeacher(null);
        onDismiss?.();
    };

    return (
        <JarvisModal
            headerProps={{
                title: course ? `Assign Teacher to ${course.title}` : 'Assign Teacher',
                icon: {
                    type: IconType.FontAwesome6,
                    name: 'chalkboard-user',
                    color: '#000000',
                    size: 32
                }
            }}
            isVisible={isVisible}
            onDismiss={onDismiss}
            confirmButtonProps={{
                title: "Assign",
                onPress: handleAssignTeacher
            }}
        >
            <View className="items-center">
                <Text className="text-white text-base mb-3">
                    Select a teacher to assign to this course:
                </Text>
                <TeacherList
                    className="w-[100%]"
                    teachers={teachers}
                    selectedTeacher={selectedTeacher}
                    teacherItemPressed={setSelectedTeacher}
                    style={{
                        maxHeight: windowHeight * 0.5
                    }}
                />
            </View>
        </JarvisModal>
    );
};

export default AssignTeacherModal;
