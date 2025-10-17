import MenuHeaderPage from "components/pages/MenuHeaderPage";
import { mockCourseData } from "lib/mockData";
import { router } from 'expo-router';
import { useState } from "react";
import { View, Text, Pressable, TextInput, ScrollView } from "react-native";
import CourseListItem from "components/lists/CourseListItem";
import { Course } from "lib/models/course";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AddClassModal from "components/modals/AddClassModal";
import ConfirmationModal from "components/modals/ConfirmationModal";
import NoDataView, { DataType } from "components/NoDataView";
import CourseList from "components/lists/CourseList";
import IconButton from "components/buttons/IconButton";
import { IconType } from "components/IconContainer";
import { useStoredCourseData } from "components/contexts/CourseContext";
import SearchBar from "components/SearchBar";

const CourseListPage = () => {
    const { setSelectedCourse } = useStoredCourseData();
    const [searchQuery, setSearchQuery] = useState("");
    const [addClassModalIsVisible, setAddClassModalIsVisible] = useState(false);
    const [confirmDeleteModalIsVisible, setConfirmDeleteModalIsVisible] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);

    const filteredCourses = mockCourseData.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

    const confirmDelete = () => {
        if (courseToDelete) {
            // TODO: Implement delete logic
            console.log("Delete course:", courseToDelete.courseId);
        }
        setConfirmDeleteModalIsVisible(false);
        setCourseToDelete(null);
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
                </View>
            </View>
        </MenuHeaderPage>
    )
}

export default CourseListPage;