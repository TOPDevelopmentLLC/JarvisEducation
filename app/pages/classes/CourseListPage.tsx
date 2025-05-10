import CourseList from "../../components/lists/CourseList";
import MenuHeaderPage from "../../components/pages/MenuHeaderPage";
import { mockCourseData } from "../../lib/mockData";


const CourseListPage = () => {
    return (
        <MenuHeaderPage 
            backgroundColor={'#000000'}
        >
            <CourseList courses={mockCourseData} />
        </MenuHeaderPage>
    )
}

export default CourseListPage;