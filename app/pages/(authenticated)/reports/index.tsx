import MenuHeaderPage from "components/pages/MenuHeaderPage";
import { router } from 'expo-router';
import { useState } from "react";
import AddReportModal from "components/modals/AddReportModal";
import { View, Text } from "react-native";
import { Report } from "lib/models/report";
import ReportsList from "components/lists/ReportsList";
import SearchBar from "components/SearchBar";
import IconButton from "components/buttons/IconButton";
import { IconType } from "components/IconContainer";
import { useStoredReportData } from "components/contexts/ReportContext";

const ReportsListPage = () => {
    const { reports, setSelectedReport } = useStoredReportData();
    const [addReportModalIsVisible, setAddReportModalIsVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredReports = reports.filter(report =>
        report.type.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
        (report.description && report.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handleAddButtonPressed = () => {
        setAddReportModalIsVisible(true);
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
        <MenuHeaderPage title="Reports">
            <View className="flex-1">
                <View className="w-[60%] mx-auto px-6 pt-4 flex-1">
                    {/* Header Section with Search and Add Button */}
                    <View className="mb-4">
                    <View className="flex-row items-center gap-3 mb-4">
                        <SearchBar 
                            className="flex-1 px-4 py-3"
                            placeholder={"Search reports..."} 
                            value={searchQuery} 
                            onValueChanged={setSearchQuery} 
                        />
                        <IconButton 
                            className="bg-jarvisPrimary"
                            iconProps={{
                                name: 'plus',
                                size: 24,
                                color: '#000000',
                                type: IconType.MaterialCommunityIcons
                            }} 
                            onIconClicked={handleAddButtonPressed} 
                        />
                    </View>

                    <Text className="text-gray-400 text-sm">
                        {filteredReports.length} {filteredReports.length === 1 ? 'report' : 'reports'} found
                    </Text>
                </View>
                <ReportsList 
                    className="flex-1"
                    reports={filteredReports} 
                    currentSearchText={searchQuery} 
                    editButtonPressed={handleEditReport} 
                    reportItemPressed={handleViewReport} 
                />
                <AddReportModal
                    isVisible={addReportModalIsVisible}
                    onDismiss={() => setAddReportModalIsVisible(false)}
                />
                </View>
            </View>
        </MenuHeaderPage>
    )
}

export default ReportsListPage;