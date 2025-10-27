import MenuHeaderPage from "components/pages/MenuHeaderPage";
import { router } from 'expo-router';
import AddTeacherModal from "components/modals/AddTeacherModal";
import ConfirmationModal from "components/modals/ConfirmationModal";
import { useState } from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import { Teacher } from "lib/models/teacher";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TeacherList from "components/lists/TeacherList";
import SearchBar from "components/SearchBar";
import IconButton from "components/buttons/IconButton";
import { IconType } from "components/IconContainer";
import { useStoredTeacherData } from "components/contexts/TeacherContext";


const TeacherListPage = () => {
    const { teachers, setSelectedTeacher, deleteTeacher } = useStoredTeacherData();
    const [addTeacherModalIsVisible, setAddTeacherModalIsVisible] = useState(false);
    const [confirmDeleteModalIsVisible, setConfirmDeleteModalIsVisible] = useState(false);
    const [teacherToDelete, setTeacherToDelete] = useState<Teacher | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredTeachers = teachers.filter(teacher =>
        teacher.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

    const confirmDelete = () => {
        if (teacherToDelete) {
            deleteTeacher(teacherToDelete.teacherId);
        }
        setConfirmDeleteModalIsVisible(false);
        setTeacherToDelete(null);
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
                </View>
            </View>
        </MenuHeaderPage>
    )
}

export default TeacherListPage;