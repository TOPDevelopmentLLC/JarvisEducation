import ReportsList from "components/lists/ReportsList";
import MenuHeaderPage from "components/pages/MenuHeaderPage";
import { mockReportData } from "lib/mockData";
import JarvisFAB from "components/JarvisFAB";
import { router } from 'expo-router';
import { useStoredReportData } from "components/contexts/ReportContext";

const ReportsListPage = () => {
    const { selectedReport } = useStoredReportData();

    const handleAddButtonPressed = () => {
        router.push('/pages/reports/NewReportPage');
    }

    const handleEditButtonPressed = () => {
        if (selectedReport === null) {
            //todo: display error to user
            return;
        }
        router.push('/pages/reports/ReportDetailsPage');
    }

    return (
        <MenuHeaderPage title="Reports">
            <ReportsList reports={mockReportData} />
            <JarvisFAB
                handleAddButtonPressed={handleAddButtonPressed}
                handleEditButtonPressed={handleEditButtonPressed}
            />
        </MenuHeaderPage>
    )
}

export default ReportsListPage;