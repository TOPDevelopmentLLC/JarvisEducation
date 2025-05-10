import StudentList from "../../components/lists/StudentList";
import MenuHeaderPage from "../../components/pages/MenuHeaderPage";
import { mockStudentData } from "../../lib/mockData";


const StudentListPage = () => {
    return (
        <MenuHeaderPage 
            backgroundColor={'#000000'}
        >
            <StudentList students={mockStudentData} />
        </MenuHeaderPage>
    )
}

export default StudentListPage;