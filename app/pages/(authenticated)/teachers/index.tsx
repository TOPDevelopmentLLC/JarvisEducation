import MenuHeaderPage from "components/pages/MenuHeaderPage";
import { router } from 'expo-router';
import AddTeacherModal from "components/modals/AddTeacherModal";
import ConfirmationModal from "components/modals/ConfirmationModal";
import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Teacher } from "lib/models/teacher";
import TeacherList from "components/lists/TeacherList";
import SearchBar from "components/SearchBar";
import IconButton from "components/buttons/IconButton";
import { IconType } from "components/IconContainer";
import { useStoredTeacherData } from "components/contexts/TeacherContext";
import { apiService } from "lib/services/apiService";
import { useProfile } from "components/contexts/ProfileContext";
import LoadingModal from "components/modals/LoadingModal";
import AlertModal from "components/modals/AlertModal";


const TeacherListPage = () => {
    const { teachers, setSelectedTeacher, deleteTeacher, setTeachers } = useStoredTeacherData();
    const { profile } = useProfile();
    const [addTeacherModalIsVisible, setAddTeacherModalIsVisible] = useState(false);
    const [confirmDeleteModalIsVisible, setConfirmDeleteModalIsVisible] = useState(false);
    const [teacherToDelete, setTeacherToDelete] = useState<Teacher | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const filteredTeachers = teachers.filter(teacher =>
        teacher.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const showAlert = (title: string, message: string) => {
        setAlertTitle(title);
        setAlertMessage(message);
        setAlertVisible(true);
    };

    // Fetch teachers on page load
    useEffect(() => {
        const fetchTeachers = async () => {
            if (!profile?.token) return;

            try {
                setLoading(true);
                const response = await apiService.getTeachers(profile.token);

                // Convert API teachers to local Teacher format
                const convertedTeachers: Teacher[] = response.map(apiTeacher => ({
                    teacherId: apiTeacher.id.toString(),
                    name: apiTeacher.name
                }));

                setTeachers(convertedTeachers);
            } catch (error) {
                console.error("Failed to fetch teachers:", error);
                showAlert("Error", error instanceof Error ? error.message : "Failed to load teachers");
            } finally {
                setLoading(false);
            }
        };

        fetchTeachers();
    }, [profile?.token]);

    const handleAddButtonPressed = () => {
        setAddTeacherModalIsVisible(true);
    }

    const handleEditTeacher = (teacher: Teacher) => {
        setSelectedTeacher(teacher);
        router.push({
            pathname: '/pages/teachers/TeacherDetailsPage',
            params: {
                edit: 1
            }
        });
    }

    const handleDeleteTeacher = (teacher: Teacher) => {
        setTeacherToDelete(teacher);
        setConfirmDeleteModalIsVisible(true);
    }

    const confirmDelete = async () => {
        if (!teacherToDelete || !profile?.token) {
            setConfirmDeleteModalIsVisible(false);
            setTeacherToDelete(null);
            return;
        }

        try {
            setLoading(true);
            await apiService.deleteTeacher(teacherToDelete.teacherId, profile.token);

            // Remove from local state
            deleteTeacher(teacherToDelete.teacherId);

            setConfirmDeleteModalIsVisible(false);
            setTeacherToDelete(null);
        } catch (error) {
            console.error("Failed to delete teacher:", error);
            showAlert("Delete Failed", error instanceof Error ? error.message : "Failed to delete teacher");
            setConfirmDeleteModalIsVisible(false);
            setTeacherToDelete(null);
        } finally {
            setLoading(false);
        }
    }

    const cancelDelete = () => {
        setConfirmDeleteModalIsVisible(false);
        setTeacherToDelete(null);
    }

    const handleViewTeacher = (teacher: Teacher) => {
        setSelectedTeacher(teacher);
        router.push({
            pathname: '/pages/teachers/TeacherDetailsPage',
            params: {
                edit: 0
            }
        });
    }

    return (
        <MenuHeaderPage title="Teachers">
            <View className="flex-1">
                <View className="w-[60%] mx-auto px-6 pt-4 flex-1">
                {/* Header Section with Search and Add Button */}
                <View className="mb-4">
                    <View className="flex-row items-center gap-3 mb-4">
                        <SearchBar 
                            className="flex-1 px-4 py-3"
                            placeholder={"Search teachers..."} 
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
                        {filteredTeachers.length} {filteredTeachers.length === 1 ? 'teacher' : 'teachers'} found
                    </Text>
                </View>
                <TeacherList 
                    className="flex-1"
                    teachers={filteredTeachers} 
                    currentSearchText={"Search teachers..."} 
                    editButtonPressed={handleEditTeacher} 
                    deleteButtonPressed={handleDeleteTeacher} 
                    teacherItemPressed={handleViewTeacher}                
                />
                <AddTeacherModal
                    isVisible={addTeacherModalIsVisible}
                    onDismiss={() => setAddTeacherModalIsVisible(false)}
                />
                <ConfirmationModal
                    isVisible={confirmDeleteModalIsVisible}
                    title="Delete Teacher"
                    message={`Are you sure you want to delete ${teacherToDelete?.name}? This action cannot be undone.`}
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

export default TeacherListPage;