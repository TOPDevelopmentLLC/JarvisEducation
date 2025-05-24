import { Report } from "lib/report";
import ReportListItem from "components/lists/ReportListItem";
import { FlatList, StyleProp, ViewStyle } from "react-native";


export interface ReportsListProps {
    reports: Report[];
    style?: StyleProp<ViewStyle>;
}

const ReportsList = ({
    reports,
    style
}: ReportsListProps) => {

    const handleDetailsButtonPressed = (report: Report) => {
        
    }
    
    return (
        <FlatList
            contentContainerStyle={style}
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