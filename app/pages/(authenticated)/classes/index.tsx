import CourseList from "components/lists/CourseList";
import MenuHeaderPage from "components/pages/MenuHeaderPage";
import { mockCourseData } from "lib/mockData";
import JarvisFAB from "components/buttons/JarvisFAB";
import { router } from 'expo-router';
import { useStoredCourseData } from "components/contexts/CourseContext";

const CourseListPage = () => {
    const { selectedCourse } = useStoredCourseData();

    const handleAddButtonPressed = () => {
        //todo: pass params to edit page
        router.push('/pages/classes/CreateNewCoursePage');
    }

    const handleEditButtonPressed = () => {
        if (selectedCourse === null) {
            //todo: display error to user
            return;
        }
        router.push({
            pathname: '/pages/classes/CourseDetailsPage',
            params: {
                edit: 1
            }
        });
    }

    return (
        <MenuHeaderPage title="Class Catalogue">
            <CourseList courses={mockCourseData} />
            <JarvisFAB
                handleAddButtonPressed={handleAddButtonPressed}
                handleEditButtonPressed={handleEditButtonPressed}
            />
        </MenuHeaderPage>
    )
}

export default CourseListPage;