import StudentList from "components/lists/StudentList";
import MenuHeaderPage from "components/pages/MenuHeaderPage";
import { mockStudentData } from "lib/mockData";
import JarvisFAB from "components/JarvisFAB";
import { router } from 'expo-router';
import { useState } from "react";
import AddStudentModal from "components/modals/AddStudentModal";


const StudentListPage = () => {
    const [addStudentModalIsVisible,setAddStudentModalIsVisible] = useState(false);

    const handleAddButtonPressed = () => {
        setAddStudentModalIsVisible(true);
    }

    const handleEditButtonPressed = () => {
        //todo: pass params to allow user to edit student
        router.push('/pages/students/StudentDetailsPage');
    }

    return (
        <MenuHeaderPage>
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