import { View } from "react-native";
import ReportsList from "components/lists/ReportsList";
import MenuHeaderPage from "components/pages/MenuHeaderPage";
import { mockReportData } from "lib/mockData";
import JarvisButton from "components/buttons/JarvisButton";


const ReportsListPage = () => {

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
            <ReportsList reports={mockReportData} />
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

export default ReportsListPage;