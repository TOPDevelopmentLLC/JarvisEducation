import MenuHeaderPage from "components/pages/MenuHeaderPage";
import { router } from 'expo-router';
import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Course } from "lib/models/course";
import AddClassModal from "components/modals/AddClassModal";
import ConfirmationModal from "components/modals/ConfirmationModal";
import NoDataView, { DataType } from "components/NoDataView";
import CourseList from "components/lists/CourseList";
import IconButton from "components/buttons/IconButton";
import { IconType } from "components/IconContainer";
import { useStoredCourseData } from "components/contexts/CourseContext";
import SearchBar from "components/SearchBar";
import { apiService } from "lib/services/apiService";
import { useProfile } from "components/contexts/ProfileContext";
import LoadingModal from "components/modals/LoadingModal";
import AlertModal from "components/modals/AlertModal";

const CourseListPage = () => {
    const { courses, setSelectedCourse, deleteCourse, setCourses } = useStoredCourseData();
    const { profile } = useProfile();
    const [searchQuery, setSearchQuery] = useState("");
    const [addClassModalIsVisible, setAddClassModalIsVisible] = useState(false);
    const [confirmDeleteModalIsVisible, setConfirmDeleteModalIsVisible] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
    const [loading, setLoading] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const showAlert = (title: string, message: string) => {
        setAlertTitle(title);
        setAlertMessage(message);
        setAlertVisible(true);
    };

    // Fetch courses on page load
    useEffect(() => {
        const fetchCourses = async () => {
            if (!profile?.token) return;

            try {
                setLoading(true);
                const response = await apiService.getClassCatalogue(profile.token);

                // Convert API courses to local Course format
                const convertedCourses: Course[] = response.map(apiCourse => ({
                    courseId: apiCourse.id.toString(),
                    title: apiCourse.courseName,
                    description: apiCourse.courseDescription
                }));

                setCourses(convertedCourses);
            } catch (error) {
                console.error("Failed to fetch courses:", error);
                showAlert("Error", error instanceof Error ? error.message : "Failed to load courses");
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, [profile?.token]);

    const handleAddButtonPressed = () => {
        setAddClassModalIsVisible(true);
    }

    const handleEditCourse = (course: Course) => {
        setSelectedCourse(course);
        router.push({
            pathname: '/pages/classes/CourseDetailsPage',
            params: {
                edit: 1
            }
        });
    }

    const handleDeleteCourse = (course: Course) => {
        setCourseToDelete(course);
        setConfirmDeleteModalIsVisible(true);
    }

    const confirmDelete = async () => {
        if (!courseToDelete || !profile?.token) {
            setConfirmDeleteModalIsVisible(false);
            setCourseToDelete(null);
            return;
        }

        try {
            setLoading(true);
            await apiService.deleteCourse(courseToDelete.courseId, profile.token);

            // Remove from local state
            deleteCourse(courseToDelete.courseId);

            setConfirmDeleteModalIsVisible(false);
            setCourseToDelete(null);
        } catch (error) {
            console.error("Failed to delete course:", error);
            showAlert("Delete Failed", error instanceof Error ? error.message : "Failed to delete course");
            setConfirmDeleteModalIsVisible(false);
            setCourseToDelete(null);
        } finally {
            setLoading(false);
        }
    }

    const cancelDelete = () => {
        setConfirmDeleteModalIsVisible(false);
        setCourseToDelete(null);
    }

    const handleViewCourse = (course: Course) => {
        setSelectedCourse(course);
        router.push({
            pathname: '/pages/classes/CourseDetailsPage',
            params: {
                edit: 0
            }
        });
    }

    return (
        <MenuHeaderPage title="Class Catalogue">
            <View className="flex-1">
                <View className="w-[60%] mx-auto px-6 pt-4 flex-1">
                {/* Header Section with Search and Add Button */}
                <View className="mb-4">
                    <View className="flex-row items-center gap-3 mb-4">
                        <SearchBar 
                            className="flex-1 px-4 py-3"
                            placeholder={"Search courses..."} 
                            value={searchQuery} 
                            onValueChanged={setSearchQuery} 
                        />
                        <IconButton 
                            className="bg-jarvisPrimary"
                            iconProps={{
                                name: 'plus',
                                size: 24,
                                color: '#000000',
                                type: IconType.MaterialCommunityIcons
                            }} 
                            onIconClicked={handleAddButtonPressed} 
                        />
                    </View>

                    <Text className="text-gray-400 text-sm">
                        {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'} found
                    </Text>
                </View>

                <CourseList 
                    className="flex-1"
                    courses={filteredCourses} 
                    currentSearchText={searchQuery} 
                    editButtonPressed={handleEditCourse} 
                    deleteButtonPressed={handleDeleteCourse} 
                    courseItemPressed={handleViewCourse} 
                />
                <AddClassModal
                    isVisible={addClassModalIsVisible}
                    onDismiss={() => setAddClassModalIsVisible(false)}
                />
                <ConfirmationModal
                    isVisible={confirmDeleteModalIsVisible}
                    title="Delete Course"
                    message={`Are you sure you want to delete "${courseToDelete?.title}"? This action cannot be undone.`}
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
                <LoadingModal
                    isVisible={loading}
                    message="Processing..."
                />
                <AlertModal
                    isVisible={alertVisible}
                    title={alertTitle}
                    message={alertMessage}
                    onConfirm={() => setAlertVisible(false)}
                />
                </View>
            </View>
        </MenuHeaderPage>
    )
}

export default CourseListPage;