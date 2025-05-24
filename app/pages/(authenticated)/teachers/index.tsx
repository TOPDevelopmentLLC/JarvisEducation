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
            <TeacherList 
                style={{
                    flex: 1, 
                    padding: 10, 
                    alignItems: 'center' 
                }}
                teachers={mockTeacherData} 
            />
            <View
                style={{
                    flexDirection: 'row',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10
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