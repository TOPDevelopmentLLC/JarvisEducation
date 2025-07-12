import { Report } from "lib/models/report";
import ReportListItem from "components/lists/ReportListItem";
import { FlatList } from "react-native";
import { useState } from "react";


export interface ReportsListProps {
    className?: string;
    reports: Report[];
}

const ReportsList = ({
    className,
    reports,
}: ReportsListProps) => {
    const [selectedId, setSelectedId] = useState<string|null>(null);

    const handleDetailsButtonPressed = (report: Report) => {
        
    }

    const handleListItemClicked = (adminId:string) => {
        if (selectedId === adminId) {
            setSelectedId(null);
        } else {
            setSelectedId(adminId);
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
                        className={data.item.reportId === selectedId ? 'bg-selectedListItemBackgroundColor' : 'bg-listItemBackgroundColor'}
                        report={data.item} 
                        detailsButtonPressed={handleDetailsButtonPressed}
                        onListItemClicked={() => handleListItemClicked(data.item.reportId)}
                    />
                )
            }}
        />
    )
}

export default ReportsList;