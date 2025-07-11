import { Report } from "lib/models/report";
import ReportListItem from "components/lists/ReportListItem";
import { FlatList } from "react-native";


export interface ReportsListProps {
    className?: string;
    reports: Report[];
}

const ReportsList = ({
    className,
    reports,
}: ReportsListProps) => {

    const handleDetailsButtonPressed = (report: Report) => {
        
    }
    
    return (
        <FlatList
            className={className}
            data={reports}
            renderItem={data => {
                return (
                    <ReportListItem 
                        report={data.item} 
                        detailsButtonPressed={handleDetailsButtonPressed}
                    />
                )
            }}
        />
    )
}

export default ReportsList;