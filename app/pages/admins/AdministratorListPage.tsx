import { mockAdminData } from "../../lib/mockData";
import AdministratorList from "../../components/lists/AdministratorList";
import MenuHeaderPage from "../../components/pages/MenuHeaderPage";


const AdministratorListPage = () => {
    return (
        <MenuHeaderPage 
            backgroundColor={'#000000'}
        >
            <AdministratorList administrators={mockAdminData} />
        </MenuHeaderPage>
    )
}

export default AdministratorListPage;