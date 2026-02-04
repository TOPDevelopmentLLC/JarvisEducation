import { useStoredStudentData } from "components/contexts/StudentContext";
import DetailsHeaderPage from "components/pages/DetailsHeaderPage";
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, useWindowDimensions } from "react-native";
import BaseButton from "components/buttons/BaseButton";
import IconContainer, { IconType } from "components/IconContainer";
import { StudentReport } from "lib/models/report";
import StudentReportsList from "components/lists/StudentReportsList";
import { apiService } from "lib/services/apiService";
import { useProfile } from "components/contexts/ProfileContext";
import { reportExportService } from "lib/services/reportExportService";
import LoadingModal from "components/modals/LoadingModal";
import AlertModal from "components/modals/AlertModal";


const StudentDetailsPage = () => {
    const { selectedStudent, setSelectedStudent } = useStoredStudentData();
    const { profile } = useProfile();
    const { edit } = useLocalSearchParams();
    const [inEditMode, setEditMode] = useState<boolean>(edit === '1');
    const [currentStudentName, setCurrentStudentName] = useState(selectedStudent.name);
    const [studentReports, setStudentReports] = useState<StudentReport[]>([]);
    const [loadingReports, setLoadingReports] = useState(false);
    const [exporting, setExporting] = useState(false);
    const [exportError, setExportError] = useState(false);
    const [noDataToExport, setNoDataToExport] = useState(false);
    const { height } = useWindowDimensions();

    // Calculate max height for reports section (20% of screen height)
    const maxReportsHeight = height * 0.2;

    // Fetch student reports when page loads
    useEffect(() => {
        const fetchStudentReports = async () => {
            if (!profile?.token || !selectedStudent?.studentId) return;

            try {
                setLoadingReports(true);
                const response = await apiService.getStudentReports(selectedStudent.studentId, profile.token);
                setStudentReports(response.reports);
            } catch (error) {
                console.error("Failed to fetch student reports:", error);
            } finally {
                setLoadingReports(false);
            }
        };

        fetchStudentReports();
    }, [profile?.token, selectedStudent?.studentId]);

    const saveButtonPressed = () => {
        setEditMode(false);
        //todo: send api call
    }

    const editButtonPressed = () => {
        setEditMode(true);
    }

    const cancelButtonPressed = () => {
        setEditMode(false);
        setCurrentStudentName(selectedStudent.name);
    }

    const handleReportPressed = (report: StudentReport) => {
        // Reports from this API endpoint are view-only for now
        console.log("Report pressed:", report);
    }

    const handleExportReports = async () => {
        if (studentReports.length === 0) {
            setNoDataToExport(true);
            return;
        }

        try {
            setExporting(true);
            await reportExportService.exportStudentReports(studentReports, selectedStudent.name);
        } catch (error) {
            console.error('Failed to export reports:', error);
            setExportError(true);
        } finally {
            setExporting(false);
        }
    };

    return (
        <DetailsHeaderPage
            title="Student Details"
            backButtonAction={() => setSelectedStudent(null)}
            rightActionIcon={{
                iconProps: {
                    name: 'file-export',
                    size: 24,
                    color: '#9cb43c',
                    type: IconType.MaterialCommunityIcons
                },
                onIconClicked: handleExportReports
            }}
        >
            <ScrollView className="flex-1 px-6 pt-6">
                <View className="max-w-2xl w-full mx-auto">
                    {/* Header Card */}
                    <View className="bg-gray-800 rounded-xl p-6 mb-6">
                        <View className="flex-row items-center mb-4">
                            <View className="bg-jarvisPrimary rounded-full p-3 mr-4">
                                <IconContainer 
                                    iconProps={{
                                        name: 'account',
                                        size: 32,
                                        color: '#000',
                                        type: IconType.MaterialCommunityIcons
                                    }} 
                                />
                            </View>
                            <View className="flex-1">
                                <Text className="text-gray-400 text-sm">Student</Text>
                                <Text className="text-white text-2xl font-bold">{selectedStudent.name}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Details Card */}
                    <View className="bg-gray-800 rounded-xl p-6 mb-6">
                        {/* Header with Edit Button */}
                        <View className="flex-row items-center justify-between mb-6">
                            <Text className="text-white text-xl font-bold">Information</Text>
                            {!inEditMode && (
                                <BaseButton
                                    title="Edit"
                                    className="bg-jarvisPrimary rounded-lg items-center active:opacity-70 px-6 py-2"
                                    textClassName="text-black text-sm font-semibold"
                                    onPress={editButtonPressed}
                                />
                            )}
                        </View>

                        {/* Full Name Field */}
                        <View className="mb-4">
                            <Text className="text-gray-400 text-sm mb-2">Full Name</Text>
                            {inEditMode ? (
                                <TextInput
                                    className="bg-gray-700 text-white rounded-lg px-4 py-3 text-base"
                                    value={currentStudentName}
                                    onChangeText={setCurrentStudentName}
                                    placeholderTextColor="#9CA3AF"
                                />
                            ) : (
                                <View className="px-4 py-3">
                                    <Text className="text-white text-base">{currentStudentName}</Text>
                                </View>
                            )}
                        </View>

                        {/* Student Points Field */}
                        <View className="mb-0">
                            <Text className="text-gray-400 text-sm mb-2">Student Points</Text>
                            <View className="px-4 py-3">
                                <Text className="text-white text-base">{selectedStudent.studentPoints}</Text>
                            </View>
                        </View>

                        {/* Action Buttons - Only show when in edit mode */}
                        {inEditMode && (
                            <View className="gap-3 mt-6">
                                <BaseButton
                                    title="Save Changes"
                                    className="bg-jarvisPrimary rounded-lg items-center active:opacity-70"
                                    textClassName="text-black text-base font-semibold"
                                    onPress={saveButtonPressed}
                                />
                                <BaseButton
                                    title="Cancel"
                                    className="bg-gray-700 rounded-lg items-center active:opacity-70"
                                    textClassName="text-white text-base font-semibold"
                                    onPress={cancelButtonPressed}
                                />
                            </View>
                        )}
                    </View>

                    {/* Reports Section */}
                    <View className="bg-gray-800 rounded-xl p-6 mb-6">
                        <Text className="text-white text-xl font-bold mb-6">Reports</Text>
                        <StudentReportsList
                            reports={studentReports}
                            loading={loadingReports}
                            maxHeight={maxReportsHeight}
                            onReportPress={handleReportPressed}
                        />
                    </View>
                </View>
            </ScrollView>

            {/* Loading Modal for Export */}
            <LoadingModal
                isVisible={exporting}
                message="Exporting reports..."
            />

            {/* Export Error Alert */}
            <AlertModal
                isVisible={exportError}
                title="Export Failed"
                message="Failed to export reports. Please try again."
                onConfirm={() => setExportError(false)}
            />

            {/* No Data to Export Alert */}
            <AlertModal
                isVisible={noDataToExport}
                title="No Data"
                message="There are no reports available to export for this student."
                onConfirm={() => setNoDataToExport(false)}
            />
        </DetailsHeaderPage>
    )
}

export default StudentDetailsPage;