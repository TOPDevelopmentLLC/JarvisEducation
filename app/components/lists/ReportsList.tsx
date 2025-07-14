import { Report } from "lib/models/report";
import ReportListItem from "components/lists/ReportListItem";
import { FlatList } from "react-native";
import { useStoredReportData } from "components/contexts/ReportContext";


export interface ReportsListProps {
    className?: string;
    reports: Report[];
}

const ReportsList = ({
    className,
    reports,
}: ReportsListProps) => {
    const { selectedReport, setSelectedReport } = useStoredReportData();

    const handleDetailsButtonPressed = (report: Report) => {
        
    }

    const handleListItemClicked = (report:Report) => {
        if (selectedReport?.reportId === report.reportId) {
            setSelectedReport(null);
        } else {
            setSelectedReport(report);
        }
    }
    
    return (
        <FlatList
            className={className}
            data={reports}
            keyExtractor={(item) => item.reportId}
            renderItem={data => {
                return (
                    <ReportListItem 
                        className={data.item.reportId === selectedReport?.reportId ? 'bg-selectedListItemBackgroundColor' : 'bg-listItemBackgroundColor'}
                        report={data.item} 
                        detailsButtonPressed={handleDetailsButtonPressed}
                        onListItemClicked={() => handleListItemClicked(data.item)}
                    />
                )
            }}
        />
    )
}

export default ReportsList;