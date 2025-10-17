import { Report } from "lib/models/report";
import ReportListItem from "components/lists/ReportListItem";
import { ScrollView } from "react-native";
import NoDataView, { DataType } from "components/NoDataView";


export interface ReportsListProps {
    className?: string;
    reports: Report[];
    currentSearchText: string;
    editButtonPressed: (report:Report) => void;
    reportItemPressed: (report:Report) => void;
}

const ReportsList = ({
    className,
    reports,
    currentSearchText,
    editButtonPressed,
    reportItemPressed,
}: ReportsListProps) => {
    return (
        <ScrollView 
            className={className}
            showsVerticalScrollIndicator={false}>
                {reports.length > 0 ? (
                    reports.map((report) => (
                        <ReportListItem
                            key={report.reportId}
                            report={report}
                            onEdit={editButtonPressed}
                            onPress={reportItemPressed}
                        />
                    ))
                ) : (
                    <NoDataView 
                        className="flex-1 py-20" 
                        dataType={DataType.REPORT}                             
                        currentSearchText={currentSearchText}
                    />
                )
            }
        </ScrollView>
    )
}

export default ReportsList;