import MenuHeaderPage from "components/pages/MenuHeaderPage";
import { router } from 'expo-router';
import { useState } from "react";
import AddStudentModal from "components/modals/AddStudentModal";
import ConfirmationModal from "components/modals/ConfirmationModal";
import { View, Text, } from "react-native";
import { Student } from "lib/models/student";
import StudentList from "components/lists/StudentList";
import SearchBar from "components/SearchBar";
import IconButton from "components/buttons/IconButton";
import { IconType } from "components/IconContainer";
import { useStoredStudentData } from "components/contexts/StudentContext";


const StudentListPage = () => {
    const { students, setSelectedStudent, deleteStudent } = useStoredStudentData();
    const [addStudentModalIsVisible, setAddStudentModalIsVisible] = useState(false);
    const [confirmDeleteModalIsVisible, setConfirmDeleteModalIsVisible] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddButtonPressed = () => {
        setAddStudentModalIsVisible(true);
    }

    const handleEditStudent = (student: Student) => {
        setSelectedStudent(student);
        router.push({
            pathname: '/pages/students/StudentDetailsPage',
            params: {
                edit: 1
            }
        });
    }

    const handleDeleteStudent = (student: Student) => {
        setStudentToDelete(student);
        setConfirmDeleteModalIsVisible(true);
    }

    const confirmDelete = () => {
        if (studentToDelete) {
            deleteStudent(studentToDelete.studentId);
        }
        setConfirmDeleteModalIsVisible(false);
        setStudentToDelete(null);
    }

    const cancelDelete = () => {
        setConfirmDeleteModalIsVisible(false);
        setStudentToDelete(null);
    }

    const handleViewStudent = (student: Student) => {
        setSelectedStudent(student);
        router.push({
            pathname: '/pages/students/StudentDetailsPage',
            params: {
                edit: 0
            }
        });
    }

    return (
        <MenuHeaderPage title="Students">
            <View className="flex-1">
                <View className="w-[60%] mx-auto px-6 pt-4 flex-1">
                {/* Header Section with Search and Add Button */}
                <View className="mb-4">
                    <View className="flex-row items-center gap-3 mb-4">
                        <SearchBar 
                            className="flex-1 px-4 py-3"
                            placeholder={"Search students..."} 
                            value={searchQuery} 
                            onValueChanged={setSearchQuery} 
                        />
                        <IconButton 
                            className="bg-jarvisPrimary"
                            iconProps={{
                                name: 'plus',
                                color: '#000000',
                                size: 24,
                                type: IconType.MaterialCommunityIcons
                            }} 
                            onIconClicked={handleAddButtonPressed} 
                        />
                    </View>

                    <Text className="text-gray-400 text-sm">
                        {filteredStudents.length} {filteredStudents.length === 1 ? 'student' : 'students'} found
                    </Text>
                </View>

                <StudentList 
                    className="flex-1"
                    students={filteredStudents} 
                    currentSearchText={searchQuery} 
                    editButtonPressed={handleEditStudent} 
                    deleteButtonPressed={handleDeleteStudent} 
                    studentItemPressed={handleViewStudent} 
                />
                <AddStudentModal
                    isVisible={addStudentModalIsVisible}
                    onDismiss={() => setAddStudentModalIsVisible(false)}
                />
                <ConfirmationModal
                    isVisible={confirmDeleteModalIsVisible}
                    title="Delete Student"
                    message={`Are you sure you want to delete ${studentToDelete?.name}? This action cannot be undone.`}
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
                </View>
            </View>
        </MenuHeaderPage>
    )
}

export default StudentListPage;