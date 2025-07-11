import ReportsList from "components/lists/ReportsList";
import MenuHeaderPage from "components/pages/MenuHeaderPage";
import { mockReportData } from "lib/mockData";
import JarvisFAB from "components/JarvisFAB";
import { router } from 'expo-router';

const ReportsListPage = () => {

    const handleAddButtonPressed = () => {
        router.push('/pages/reports/NewReportPage');
    }

    const handleEditButtonPressed = () => {
        //todo: check if user is owner of report before allowing edits
        router.push('/pages/reports/ReportDetailsPage');
    }

    return (
        <MenuHeaderPage>
            <ReportsList 
                className="flex-1 p-5 items-center"
                reports={mockReportData} 
            />
            <JarvisFAB
                handleAddButtonPressed={handleAddButtonPressed}
                handleEditButtonPressed={handleEditButtonPressed}
            />
        </MenuHeaderPage>
    )
}

export default ReportsListPage;