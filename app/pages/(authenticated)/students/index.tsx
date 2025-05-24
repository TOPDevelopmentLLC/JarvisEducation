import { View } from "react-native";
import StudentList from "components/lists/StudentList";
import MenuHeaderPage from "components/pages/MenuHeaderPage";
import { mockStudentData } from "lib/mockData";
import JarvisButton from "components/buttons/JarvisButton";


const StudentListPage = () => {

    const handleAddButtonPressed = () => {

    }

    const handleEditButtonPressed = () => {
        
    }

    const handleDeleteButtonPressed = () => {
        
    }


    return (
        <MenuHeaderPage 
            backgroundColor={'#000000'}
        >
            <StudentList students={mockStudentData} />
            <View
                style={{
                    flexDirection: 'row',
                }}>
                    <JarvisButton 
                        title={"Add"} 
                        onPress={handleAddButtonPressed} 
                    />
                    <JarvisButton 
                        title={"Edit"} 
                        onPress={handleEditButtonPressed} 
                    />
                    <JarvisButton 
                        title={"Delete"} 
                        onPress={handleDeleteButtonPressed} 
                    />
            </View>
        </MenuHeaderPage>
    )
}

export default StudentListPage;