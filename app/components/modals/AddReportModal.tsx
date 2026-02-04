import { View, Text, Dimensions, ActivityIndicator } from "react-native";
import JarvisModal from "./JarvisModal";
import { IconType } from "components/IconContainer";
import { useState, useEffect } from "react";
import { MoodType, ReportType } from "lib/models/report";
import StudentList from "components/lists/StudentList";
import { useStoredStudentData } from "components/contexts/StudentContext";
import { useStoredReportData } from "components/contexts/ReportContext";
import JarvisPaperTextInput from "components/JarvisPaperTextInput";
import MoodLabelList from "components/lists/MoodLabelList";
import ReportTypeList from "components/lists/ReportTypeList";
import { useErrorSnackbar } from "components/contexts/SnackbarContext";
import { Student } from "lib/models/student";
import { apiService } from "lib/services/apiService";
import { useProfile } from "components/contexts/ProfileContext";

export interface AddReportModalProps {
    isVisible: boolean;
    onDismiss?: () => void;
}

type Step = 1 | 2 | 3;

const AddReportModal = ({
    isVisible,
    onDismiss,
}: AddReportModalProps) => {
    const [currentStep, setCurrentStep] = useState<Step>(1);
    const [selectedReportType, setSelectedReportType] = useState<ReportType | null>(null);
    const [reportDescription, setReportDescription] = useState('');
    const [selectedMoodtype, setSelectedMoodType] = useState<MoodType | null>(null);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [attitude, setAttitude] = useState('');
    const [socialization, setSocialization] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingStudents, setLoadingStudents] = useState(false);
    const showErrorMessage = useErrorSnackbar();
    const { students, setStudents, addReportToStudent } = useStoredStudentData();
    const { addReport } = useStoredReportData();
    const { profile } = useProfile();
    const windowHeight = Dimensions.get('window').height;

    // Fetch students when modal opens if they haven't been loaded yet
    useEffect(() => {
        const fetchStudents = async () => {
            if (!isVisible || !profile?.token || students.length > 0) return;

            try {
                setLoadingStudents(true);
                const response = await apiService.getStudents(profile.token);

                // Convert API students to local Student format
                const convertedStudents: Student[] = response.map(apiStudent => ({
                    studentId: apiStudent.id.toString(),
                    name: apiStudent.name,
                    studentPoints: apiStudent.studentPoints
                }));

                setStudents(convertedStudents);
            } catch (error) {
                console.error("Failed to fetch students:", error);
                showErrorMessage(error instanceof Error ? error.message : 'Failed to load students');
            } finally {
                setLoadingStudents(false);
            }
        };

        fetchStudents();
    }, [isVisible, profile?.token, students.length]);

    const resetForm = () => {
        setCurrentStep(1);
        setSelectedReportType(null);
        setReportDescription('');
        setSelectedMoodType(null);
        setSelectedStudent(null);
        setAttitude('');
        setSocialization('');
    };

    const handleDismiss = () => {
        resetForm();
        onDismiss?.();
    };

    const handleReportTypeSelected = (reportType: ReportType) => {
        setSelectedReportType(reportType);
        setCurrentStep(2);
    };

    const handleStudentSelected = (student: Student) => {
        setSelectedStudent(student);
        setCurrentStep(3);
    };

    const handleBack = () => {
        if (currentStep === 2) {
            setSelectedStudent(null);
            setCurrentStep(1);
        } else if (currentStep === 3) {
            // Reset step 3 specific data
            setReportDescription('');
            setSelectedMoodType(null);
            setAttitude('');
            setSocialization('');
            setCurrentStep(2);
        }
    };

    const addButtonPressed = async () => {
        if (!selectedStudent) {
            showErrorMessage('Please select a student to continue.');
            return;
        }
        if (selectedReportType === null) {
            showErrorMessage('Please select a report type to continue.');
            return;
        }
        if (selectedReportType === ReportType.Mood && selectedMoodtype === null) {
            showErrorMessage('Please select a mood type to continue.');
            return;
        }
        if (selectedReportType === ReportType.CheckIn && (attitude.trim().length === 0 || socialization.trim().length === 0)) {
            showErrorMessage('Please enter both attitude and socialization values to continue.');
            return;
        }
        if ((selectedReportType === ReportType.Behavior ||
            selectedReportType === ReportType.Conflict ||
            selectedReportType === ReportType.Expelled ||
            selectedReportType === ReportType.Secluded ||
            selectedReportType === ReportType.SIP) &&
            reportDescription.length === 0) {
            showErrorMessage('Please enter a description to continue.');
            return;
        }

        if (!profile?.token || !profile?.id) {
            showErrorMessage('Authentication required. Please log in again.');
            return;
        }

        try {
            setLoading(true);

            // Prepare description based on report type
            const description = selectedReportType === ReportType.Mood
                ? selectedMoodtype?.toString() || ''
                : reportDescription;

            // Call API to create report
            const response = await apiService.createReport(
                {
                    reportType: selectedReportType,
                    description: description,
                    moodType: selectedReportType === ReportType.Mood ? selectedMoodtype?.toString() : undefined,
                    reportedByName: profile.fullName || profile.email,
                    reportedById: profile.id
                },
                profile.token
            );

            // Add to local state with converted format
            addReport({
                reportId: response.report.id.toString(),
                type: response.report.reportType as ReportType,
                description: response.report.description,
                studentId: selectedStudent.studentId,
                reportedById: response.report.reportedById.toString(),
                reportedByName: response.report.reportedByName,
                attitude: selectedReportType === ReportType.CheckIn ? attitude : undefined,
                socialization: selectedReportType === ReportType.CheckIn ? socialization : undefined,
            });

            // Add report to student's reportIds
            addReportToStudent(selectedStudent.studentId, response.report.id.toString());

            // Reset form and close modal
            resetForm();
            onDismiss?.();
        } catch (error) {
            console.error("Failed to create report:", error);
            showErrorMessage(error instanceof Error ? error.message : 'Failed to create report');
        } finally {
            setLoading(false);
        }
    };

    const getStepTitle = () => {
        switch (currentStep) {
            case 1:
                return 'Select Report Type';
            case 2:
                return 'Select Student';
            case 3:
                return `Add ${selectedReportType} Report`;
            default:
                return 'Add Report';
        }
    };

    const renderStep1 = () => (
        <View className="items-center">
            <Text className="text-gray-400 text-base mb-4">Choose the type of report you want to create</Text>
            <ReportTypeList
                selectedReportType={selectedReportType}
                reportTypeSelected={handleReportTypeSelected}
            />
        </View>
    );

    const renderStep2 = () => (
        <View className="items-center">
            <Text className="text-gray-400 text-base mb-4">Select the student for this {selectedReportType} report</Text>
            {loadingStudents ? (
                <View className="py-8">
                    <ActivityIndicator size="large" color="#9cb43c" />
                    <Text className="text-gray-400 text-base mt-4">Loading students...</Text>
                </View>
            ) : (
                <StudentList
                    className="w-[100%]"
                    students={students}
                    selectedStudent={selectedStudent}
                    studentItemPressed={handleStudentSelected}
                    style={{
                        maxHeight: windowHeight * 0.4
                    }}
                />
            )}
        </View>
    );

    const renderStep3 = () => {
        switch (selectedReportType) {
            case ReportType.Attendance:
                return (
                    <View className="items-center">
                        <Text className="text-gray-400 text-base">
                            You are about to add an Attendance report for {selectedStudent?.name}.
                        </Text>
                    </View>
                );

            case ReportType.Behavior:
                return (
                    <View className="items-center">
                        <JarvisPaperTextInput
                            placeholder={"Description"}
                            onTextChange={(description) => setReportDescription(description)}
                            defaultValue={reportDescription}
                            multiline={true}
                            style={{
                                width: 500,
                            }}
                        />
                    </View>
                );

            case ReportType.CheckIn:
                return (
                    <View className="items-center">
                        <View style={{ width: 500 }}>
                            <JarvisPaperTextInput
                                placeholder={"Attitude"}
                                onTextChange={(text) => setAttitude(text)}
                                defaultValue={attitude}
                            />
                            <JarvisPaperTextInput
                                placeholder={"Socialization"}
                                onTextChange={(text) => setSocialization(text)}
                                defaultValue={socialization}
                                style={{
                                    marginTop: 8
                                }}
                            />
                        </View>
                    </View>
                );

            case ReportType.Conflict:
                return (
                    <View className="items-center">
                        <JarvisPaperTextInput
                            placeholder={"Description"}
                            onTextChange={(description) => setReportDescription(description)}
                            defaultValue={reportDescription}
                            multiline={true}
                            style={{
                                width: 500,
                            }}
                        />
                    </View>
                );

            case ReportType.Expelled:
                return (
                    <View className="items-center">
                        <JarvisPaperTextInput
                            placeholder={"Description"}
                            onTextChange={(description) => setReportDescription(description)}
                            defaultValue={reportDescription}
                            multiline={true}
                            style={{
                                width: 500,
                            }}
                        />
                    </View>
                );

            case ReportType.Mood:
                return (
                    <View className="items-center">
                        <MoodLabelList
                            selectedMoodType={selectedMoodtype}
                            moodTypeSelected={(moodtype) => setSelectedMoodType(moodtype)}
                        />
                        <JarvisPaperTextInput
                            placeholder={"Description"}
                            onTextChange={(description) => setReportDescription(description)}
                            defaultValue={reportDescription}
                            multiline={true}
                            style={{
                                width: 500,
                                marginTop: 12
                            }}
                        />
                    </View>
                );

            case ReportType.Secluded:
                return (
                    <View className="items-center">
                        <JarvisPaperTextInput
                            placeholder={"Description"}
                            onTextChange={(description) => setReportDescription(description)}
                            defaultValue={reportDescription}
                            multiline={true}
                            style={{
                                width: 500,
                            }}
                        />
                    </View>
                );

            case ReportType.SIP:
                return (
                    <View className="items-center">
                        <JarvisPaperTextInput
                            placeholder={"Description"}
                            onTextChange={(description) => setReportDescription(description)}
                            defaultValue={reportDescription}
                            multiline={true}
                            style={{
                                width: 500,
                            }}
                        />
                    </View>
                );

            default:
                return null;
        }
    };

    const getConfirmButtonProps = () => {
        if (currentStep !== 3) {
            return undefined;
        }

        return {
            title: loading ? "Adding..." : "Add Report",
            onPress: addButtonPressed,
            disabled: loading
        };
    };

    return (
        <JarvisModal
            headerProps={{
                title: getStepTitle(),
                icon: {
                    type: IconType.Feather,
                    name: 'file-plus',
                    color: '#000000',
                    size: 32
                }
            }}
            isVisible={isVisible}
            onDismiss={handleDismiss}
            onBack={currentStep > 1 ? handleBack : undefined}
            confirmButtonProps={getConfirmButtonProps()}
        >
            <View>
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}
            </View>
        </JarvisModal>
    );
};

export default AddReportModal;
