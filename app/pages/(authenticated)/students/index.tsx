import StudentList from "components/lists/StudentList";
import MenuHeaderPage from "components/pages/MenuHeaderPage";
import { mockStudentData } from "lib/mockData";
import JarvisFAB from "components/buttons/JarvisFAB";
import { router } from 'expo-router';
import { useState } from "react";
import AddStudentModal from "components/modals/AddStudentModal";
import { useStoredStudentData } from "components/contexts/StudentContext";


const StudentListPage = () => {
    const [addStudentModalIsVisible,setAddStudentModalIsVisible] = useState(false);
    const { selectedStudent } = useStoredStudentData();

    const handleAddButtonPressed = () => {
        setAddStudentModalIsVisible(true);
    }

    const handleEditButtonPressed = () => {
        if (selectedStudent === null) {
            //todo: push a toast message to display an error to the user
            return;
        }
        router.push({
            pathname: '/pages/students/StudentDetailsPage',
            params: {
                edit: 1
            }
        });
    }

    return (
        <MenuHeaderPage title="Students">
            <StudentList students={mockStudentData} />
            <AddStudentModal 
                isVisible={addStudentModalIsVisible} 
                onDismiss={() => setAddStudentModalIsVisible(false)}
            />
            <JarvisFAB
                handleAddButtonPressed={handleAddButtonPressed}
                handleEditButtonPressed={handleEditButtonPressed}
            />
        </MenuHeaderPage>
    )
}

export default StudentListPage;