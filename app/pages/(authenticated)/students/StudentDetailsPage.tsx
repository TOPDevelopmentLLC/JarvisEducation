import { useStoredStudentData } from "components/contexts/StudentContext";
import { useStoredReportData } from "components/contexts/ReportContext";
import DetailsHeaderPage from "components/pages/DetailsHeaderPage";
import { useLocalSearchParams, router } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, ScrollView, useWindowDimensions } from "react-native";
import BaseButton from "components/buttons/BaseButton";
import IconContainer, { IconType } from "components/IconContainer";
import { Report } from "lib/models/report";
import ReportListItem from "components/lists/ReportListItem";


const StudentDetailsPage = () => {
    const { selectedStudent, setSelectedStudent } = useStoredStudentData();
    const { reports, setSelectedReport } = useStoredReportData();
    const { edit } = useLocalSearchParams();
    const [inEditMode, setEditMode] = useState<boolean>(edit === '1');
    const [currentStudentName, setCurrentStudentName] = useState(selectedStudent.name);
    const { height } = useWindowDimensions();

    // Get all reports assigned to this student
    const assignedReports = reports.filter(report =>
        selectedStudent.reportIds?.includes(report.reportId)
    );

    // Calculate max height for reports section (20% of screen height)
    const maxReportsHeight = height * 0.2;

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

    const handleReportPressed = (report: Report) => {
        setSelectedReport(report);
        router.push({
            pathname: '/pages/reports/ReportDetailsPage',
            params: {
                edit: 0
            }
        });
    }

    return (
        <DetailsHeaderPage
            title="Student Details"
            backButtonAction={() => setSelectedStudent(null)}
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
                        <View className="mb-0">
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
                        {assignedReports.length > 0 ? (
                            <ScrollView
                                style={{ maxHeight: maxReportsHeight }}
                                showsVerticalScrollIndicator={true}
                            >
                                {assignedReports.map((report) => (
                                    <ReportListItem
                                        key={report.reportId}
                                        report={report}
                                        onPress={handleReportPressed}
                                    />
                                ))}
                            </ScrollView>
                        ) : (
                            <View className="px-4 py-3">
                                <Text className="text-white text-base">None</Text>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </DetailsHeaderPage>
    )
}

export default StudentDetailsPage;