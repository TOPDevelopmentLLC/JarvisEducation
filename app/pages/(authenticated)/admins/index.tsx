import { mockAdminData } from "lib/mockData";
import AdministratorList from "components/lists/AdministratorList";
import MenuHeaderPage from "components/pages/MenuHeaderPage";
import JarvisFAB from "components/JarvisFAB";
import { router } from 'expo-router';
import AddAdminModal from "components/modals/AddAdminModal";
import { useState } from "react";


const AdministratorListPage = () => {
    const [addAdminModalIsVisible,setAddAdminModalIsVisible] = useState(false);

    const handleAddButtonPressed = () => {
        setAddAdminModalIsVisible(true);
    }

    const handleEditButtonPressed = () => {
        router.push('/pages/admins/AdministratorDetailsPage');
    }

    return (
        <MenuHeaderPage>
            <AdministratorList 
                className="flex-1 p-5 items-center"
                administrators={mockAdminData} 
            />
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