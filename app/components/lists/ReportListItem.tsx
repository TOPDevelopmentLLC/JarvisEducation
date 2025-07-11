import { Text, View } from "react-native";
import { Report } from "lib/models/report";
import JarvisButton from "components/buttons/JarvisButton";
import clsx from "clsx";


export interface ReportListItemProps {
    className?: string;
    report: Report;
    detailsButtonPressed: (report:Report) => void;
}

const ReportListItem = ({
    className,
    report,
    detailsButtonPressed
}: ReportListItemProps) => {

    return (
        <View className={clsx(className, 'flex-row items-center')}>
            <Text className="text-white">{report.type.toString()}</Text>
            <JarvisButton title={"Details"} onPress={() => detailsButtonPressed(report)} />
        </View>
    )
}

export default ReportListItem;