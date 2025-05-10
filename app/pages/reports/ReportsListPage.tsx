import ReportsList from "../../components/lists/ReportsList";
import MenuHeaderPage from "../../components/pages/MenuHeaderPage";
import { mockReportData } from "../../lib/mockData";


const ReportsListPage = () => {
    return (
        <MenuHeaderPage 
            backgroundColor={'#000000'}
        >
            <ReportsList reports={mockReportData} />
        </MenuHeaderPage>
    )
}

export default ReportsListPage;