import { Report } from "../../lib/report";
import ReportListItem from "./ReportListItem";


export interface ReportsListProps {
    reports: Report[];
}

const ReportsList = ({
    reports
}: ReportsListProps) => {
    
    return (
        <>
            {
                reports.map(report => {
                    return (
                        <ReportListItem report={report} />
                    )
                })
            }
        </>
    )
}

export default ReportsList;