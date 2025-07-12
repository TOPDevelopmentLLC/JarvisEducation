import TeacherList from "components/lists/TeacherList";
import MenuHeaderPage from "components/pages/MenuHeaderPage";
import { mockTeacherData } from "lib/mockData";
import JarvisFAB from "components/JarvisFAB";
import { router } from 'expo-router';
import AddTeacherModal from "components/modals/AddTeacherModal";
import { useState } from "react";


const TeacherListPage = () => {
    const [addTeacherModalIsVisible,setAddTeacherModalIsVisible] = useState(false);

    const handleAddButtonPressed = () => {
        setAddTeacherModalIsVisible(true);
    }

    const handleEditButtonPressed = () => {
        //todo: pass params to allow the user to edit the teacher
        router.push('/pages/teachers/TeacherDetailsPage');
    }

    return (
        <MenuHeaderPage title="Teachers">
            <TeacherList teachers={mockTeacherData} />
            <AddTeacherModal 
                isVisible={addTeacherModalIsVisible} 
                onDismiss={() => setAddTeacherModalIsVisible(false)}
            />
            <JarvisFAB
                handleAddButtonPressed={handleAddButtonPressed}
                handleEditButtonPressed={handleEditButtonPressed}
            />
        </MenuHeaderPage>
    )
}

export default TeacherListPage;