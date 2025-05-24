import { Text, View } from "react-native";
import { Report } from "lib/report";
import JarvisButton from "components/buttons/JarvisButton";


export interface ReportListItemProps {
    report: Report;
    detailsButtonPressed: (report:Report) => void;
}

const ReportListItem = ({
    report,
    detailsButtonPressed
}: ReportListItemProps) => {

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <Text style={{color: 'white'}}>{report.type.toString()}</Text>
            <JarvisButton title={"Details"} onPress={() => detailsButtonPressed(report)} />
        </View>
    )
}

export default ReportListItem;