import CourseList from "components/lists/CourseList";
import MenuHeaderPage from "components/pages/MenuHeaderPage";
import { mockCourseData } from "lib/mockData";
import JarvisFAB from "components/JarvisFAB";
import { router } from 'expo-router';

const CourseListPage = () => {

    const handleAddButtonPressed = () => {
        //todo: pass params to edit page
        router.push('/pages/classes/CreateNewCoursePage');
    }

    const handleEditButtonPressed = () => {
        router.push('/pages/classes/CourseDetailsPage');
    }

    return (
        <MenuHeaderPage>
            <CourseList 
                className="flex-1 p-5 items-center"
                courses={mockCourseData} 
            />
            <JarvisFAB
                handleAddButtonPressed={handleAddButtonPressed}
                handleEditButtonPressed={handleEditButtonPressed}
            />
        </MenuHeaderPage>
    )
}

export default CourseListPage;