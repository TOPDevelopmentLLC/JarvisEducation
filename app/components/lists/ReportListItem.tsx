import { Pressable, Text, View } from "react-native";
import { Report } from "lib/models/report";
import JarvisButton, { JarvisButtonType } from "components/buttons/JarvisButton";
import clsx from "clsx";


export interface ReportListItemProps {
    className?: string;
    report: Report;
    detailsButtonPressed: (report:Report) => void;
    onListItemClicked: () => void;
}

const ReportListItem = ({
    className,
    report,
    detailsButtonPressed,
    onListItemClicked
}: ReportListItemProps) => {

    return (
        <View className="w-screen items-center">
            <Pressable 
                className={clsx("flex-row items-center w-1/2 rounded-lg p-2 my-1 justify-between", className)}
                onPress={onListItemClicked}>
                <Text className="">{report.type.toString()}</Text>
                <JarvisButton 
                    type={JarvisButtonType.transparentBorder} 
                    title={"Details"} 
                    onPress={() => detailsButtonPressed(report)} 
                />
            </Pressable>
        </View>
    )
}

export default ReportListItem;