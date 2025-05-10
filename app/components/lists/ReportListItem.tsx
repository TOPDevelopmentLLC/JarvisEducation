import { Text, View } from "react-native";
import { Report } from "../../lib/report";


export interface ReportListItemProps {
    report: Report;
}

const ReportListItem = ({
    report
}: ReportListItemProps) => {

    return (
        <View>
            <Text>{report.type.toString()}</Text>
        </View>
    )
}

export default ReportListItem;