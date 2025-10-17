import MenuHeaderPage from "components/pages/MenuHeaderPage";
import { View, Text, ScrollView, Pressable } from "react-native";
import { router } from "expo-router";
import { mockReportData } from "lib/mockData";
import ReportListItem from "components/lists/ReportListItem";
import { Report } from "lib/models/report";
import { useStoredReportData } from "components/contexts/ReportContext";


const HomePage = () => {
    const { setSelectedReport } = useStoredReportData();

    // Get only the 5 most recent reports
    const recentReports = mockReportData.slice(0, 5);

    const handleNewReportPressed = () => {
        router.push('/pages/reports/NewReportPage');
    }

    const handleViewAllReportsPressed = () => {
        router.push('/pages/reports');
    }

    const handleEditReport = (report: Report) => {
        setSelectedReport(report);
        router.push({
            pathname: '/pages/reports/ReportDetailsPage',
            params: {
                edit: 1
            }
        });
    }

    const handleViewReport = (report: Report) => {
        setSelectedReport(report);
        router.push({
            pathname: '/pages/reports/ReportDetailsPage',
            params: {
                edit: 0
            }
        });
    }

    return (
        <MenuHeaderPage title="Home">
            <ScrollView className="flex-1">
                <View className="w-[60%] mx-auto px-6">
                {/* Quick Actions Section */}
                <View className="mt-6">
                    <Text className="text-2xl font-bold text-white mb-4">Quick Actions</Text>

                    <Pressable
                        className="bg-jarvisPrimary rounded-lg p-4 mb-3 items-center active:opacity-80"
                        onPress={handleNewReportPressed}>
                        <Text className="text-black text-lg font-semibold">+ Create New Report</Text>
                    </Pressable>

                    <Pressable
                        className="bg-gray-700 rounded-lg p-4 items-center active:opacity-80"
                        onPress={handleViewAllReportsPressed}>
                        <Text className="text-white text-lg font-semibold">View All Reports</Text>
                    </Pressable>
                </View>

                {/* Recent Reports Section */}
                <View className="mt-8 mb-6">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-2xl font-bold text-white">Recent Reports</Text>
                        <Pressable onPress={handleViewAllReportsPressed}>
                            <Text className="text-jarvisPrimary text-base">View All</Text>
                        </Pressable>
                    </View>

                    {recentReports.length > 0 ? (
                        <View>
                            {recentReports.map((report) => (
                                <ReportListItem
                                    key={report.reportId}
                                    report={report}
                                    onEdit={handleEditReport}
                                    onPress={handleViewReport}
                                />
                            ))}
                        </View>
                    ) : (
                        <View className="bg-gray-800 rounded-lg p-6 items-center">
                            <Text className="text-gray-400 text-base">No reports yet</Text>
                            <Text className="text-gray-500 text-sm mt-2">Create your first report to get started</Text>
                        </View>
                    )}
                </View>
                </View>
            </ScrollView>
        </MenuHeaderPage>
    )
}

export default HomePage;