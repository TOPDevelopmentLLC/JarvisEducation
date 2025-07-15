import { mockAdminData } from "lib/mockData";
import AdministratorList from "components/lists/AdministratorList";
import MenuHeaderPage from "components/pages/MenuHeaderPage";
import JarvisFAB from "components/buttons/JarvisFAB";
import { router } from 'expo-router';
import AddAdminModal from "components/modals/AddAdminModal";
import { useState } from "react";
import { useStoredAdminData } from "components/contexts/AdminContext";


const AdministratorListPage = () => {
    const [addAdminModalIsVisible,setAddAdminModalIsVisible] = useState(false);
    const { selectedAdmin } = useStoredAdminData();

    const handleAddButtonPressed = () => {
        setAddAdminModalIsVisible(true);
    }

    const handleEditButtonPressed = () => {
        if (selectedAdmin === null) {
            //todo: display error to the user
            return;
        }
        router.push({
            pathname: '/pages/admins/AdministratorDetailsPage',
            params: {
                edit: 1
            }
        });
    }

    return (
        <MenuHeaderPage title="Administrators">
            <AdministratorList administrators={mockAdminData} />
            <AddAdminModal 
                isVisible={addAdminModalIsVisible} 
                onDismiss={() => setAddAdminModalIsVisible(false)}
            />
            <JarvisFAB
                handleAddButtonPressed={handleAddButtonPressed}
                handleEditButtonPressed={handleEditButtonPressed}
            />
        </MenuHeaderPage>
    )
}

export default AdministratorListPage;