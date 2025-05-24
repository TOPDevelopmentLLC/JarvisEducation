import { mockAdminData } from "lib/mockData";
import AdministratorList from "components/lists/AdministratorList";
import MenuHeaderPage from "components/pages/MenuHeaderPage";
import { View } from "react-native";
import JarvisButton from "components/buttons/JarvisButton";


const AdministratorListPage = () => {

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
            <AdministratorList style={{ flex: 1, padding: 10 }} administrators={mockAdminData} />
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

export default AdministratorListPage;