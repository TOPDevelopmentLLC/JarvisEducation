import { Pressable, Text, View } from "react-native";
import { Report } from "lib/models/report";
import clsx from "clsx";
import DeleteButton from "components/buttons/DeleteButton";
import EditButton from "components/buttons/EditButton";


export interface ReportListItemProps {
    className?: string;
    report: Report;
    onEdit?: (report: Report) => void;
    onDelete?: (report: Report) => void;
    onPress?: (report: Report) => void;
}

const ReportListItem = ({
    className,
    report,
    onEdit,
    onDelete,
    onPress
}: ReportListItemProps) => {
    return (
        <Pressable
            className={clsx("flex-row items-center bg-gray-800 rounded-xl p-4 mb-3 justify-between active:opacity-80", className)}
            onPress={() => onPress?.(report)}>
            <View className="flex-1">
                <Text className="text-white text-lg font-semibold">{report.type.toString()}</Text>
                {report.description && (
                    <Text className="text-gray-400 text-sm mt-1" numberOfLines={1}>{report.description}</Text>
                )}
            </View>

            <View className="flex-row gap-2 ml-3">
                {onEdit && (
                    <EditButton 
                        onIconClicked={(e) => {
                            e.stopPropagation();
                            onEdit(report);
                        }}
                    />
                )}
                {onDelete && (
                    <DeleteButton 
                        onIconClicked={(e) => {
                            e.stopPropagation();
                            onDelete(report);
                        }} 
                    />
                )}
            </View>
        </Pressable>
    )
}

export default ReportListItem;