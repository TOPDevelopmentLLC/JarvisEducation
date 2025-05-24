import { View } from "react-native";
import TeacherList from "components/lists/TeacherList";
import MenuHeaderPage from "components/pages/MenuHeaderPage";
import { mockTeacherData } from "lib/mockData";
import JarvisButton from "components/buttons/JarvisButton";


const TeacherListPage = () => {

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
            <TeacherList teachers={mockTeacherData} />
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

export default TeacherListPage;