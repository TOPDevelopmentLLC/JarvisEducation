import { View } from "react-native";
import CourseList from "components/lists/CourseList";
import MenuHeaderPage from "components/pages/MenuHeaderPage";
import { mockCourseData } from "lib/mockData";
import JarvisButton from "components/buttons/JarvisButton";


const CourseListPage = () => {

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
            <CourseList courses={mockCourseData} />
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

export default CourseListPage;