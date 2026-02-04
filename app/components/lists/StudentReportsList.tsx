import { View, Text, ScrollView, ActivityIndicator, Pressable } from "react-native";
import { StudentReport } from "lib/models/report";
import clsx from "clsx";

export interface StudentReportsListProps {
    className?: string;
    reports: StudentReport[];
    loading?: boolean;
    maxHeight?: number;
    onReportPress?: (report: StudentReport) => void;
}

const StudentReportsList = ({
    className,
    reports,
    loading = false,
    maxHeight,
    onReportPress
}: StudentReportsListProps) => {
    if (loading) {
        return (
            <View className={clsx("items-center py-4", className)}>
                <ActivityIndicator size="large" color="#9cb43c" />
                <Text className="text-gray-400 text-base mt-2">Loading reports...</Text>
            </View>
        );
    }

    if (reports.length === 0) {
        return (
            <View className={clsx("px-4 py-3", className)}>
                <Text className="text-white text-base">None</Text>
            </View>
        );
    }

    return (
        <ScrollView
            style={maxHeight ? { maxHeight } : undefined}
            showsVerticalScrollIndicator={true}
            className={className}
        >
            {reports.map((report) => (
                <Pressable
                    key={report.id}
                    className="flex-row items-center bg-gray-700 rounded-xl p-4 mb-3 justify-between active:opacity-80"
                    onPress={() => onReportPress?.(report)}
                >
                    <View className="flex-1">
                        <Text className="text-white text-lg font-semibold">{report.reportType}</Text>
                        {report.description && (
                            <Text className="text-gray-400 text-sm mt-1" numberOfLines={1}>{report.description}</Text>
                        )}
                        <Text className="text-gray-500 text-xs mt-1">Reported by: {report.reportedByName}</Text>
                    </View>
                </Pressable>
            ))}
        </ScrollView>
    );
};

export default StudentReportsList;
