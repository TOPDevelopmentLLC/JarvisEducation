import { Text, View } from "react-native";
import { Report } from "lib/models/report";
import JarvisButton, { JarvisButtonType } from "components/buttons/JarvisButton";
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
        <View className="w-screen items-center">
            <View className={clsx("flex-row items-center w-1/2 bg-listItemBackgroundColor rounded-lg p-2 my-1 justify-between", className)}>
                <Text className="">{report.type.toString()}</Text>
                <JarvisButton 
                    type={JarvisButtonType.transparentBorder} 
                    title={"Details"} 
                    onPress={() => detailsButtonPressed(report)} 
                />
            </View>
        </View>
    )
}

export default ReportListItem;