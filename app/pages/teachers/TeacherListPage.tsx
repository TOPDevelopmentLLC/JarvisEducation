import TeacherList from "../../components/lists/TeacherList";
import MenuHeaderPage from "../../components/pages/MenuHeaderPage";
import { mockTeacherData } from "../../lib/mockData";


const TeacherListPage = () => {
    return (
        <MenuHeaderPage 
            backgroundColor={'#000000'}
        >
            <TeacherList teachers={mockTeacherData} />
        </MenuHeaderPage>
    )
}

export default TeacherListPage;