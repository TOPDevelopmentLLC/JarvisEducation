import { View, Text, Dimensions, ActivityIndicator, Pressable, ScrollView } from "react-native";
import JarvisModal from "./JarvisModal";
import { IconType } from "components/IconContainer";
import { useState, useEffect } from "react";
import { MoodType, ReportType, ABC_ANTECEDENTS, ABC_BEHAVIORS, ABC_CONSEQUENCES } from "lib/models/report";
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
import { Checkbox } from "react-native-paper";
import BaseButton from "components/buttons/BaseButton";

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
    // ABC specific state
    const [abcSubStep, setAbcSubStep] = useState<1 | 2 | 3>(1);
    const [selectedAntecedents, setSelectedAntecedents] = useState<string[]>([]);
    const [selectedBehaviors, setSelectedBehaviors] = useState<string[]>([]);
    const [selectedConsequences, setSelectedConsequences] = useState<string[]>([]);
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
        // Reset ABC state
        setAbcSubStep(1);
        setSelectedAntecedents([]);
        setSelectedBehaviors([]);
        setSelectedConsequences([]);
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
            // Handle ABC sub-steps back navigation
            if (selectedReportType === ReportType.ABC) {
                if (abcSubStep === 1) {
                    // Go back to student selection
                    setSelectedAntecedents([]);
                    setCurrentStep(2);
                } else if (abcSubStep === 2) {
                    setSelectedBehaviors([]);
                    setAbcSubStep(1);
                } else if (abcSubStep === 3) {
                    setSelectedConsequences([]);
                    setAbcSubStep(2);
                }
            } else {
                // Reset step 3 specific data for other report types
                setReportDescription('');
                setSelectedMoodType(null);
                setAttitude('');
                setSocialization('');
                setCurrentStep(2);
            }
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
        if (selectedReportType === ReportType.ABC) {
            if (selectedAntecedents.length === 0) {
                showErrorMessage('Please select at least one antecedent.');
                return;
            }
            if (selectedBehaviors.length === 0) {
                showErrorMessage('Please select at least one behavior.');
                return;
            }
            if (selectedConsequences.length === 0) {
                showErrorMessage('Please select at least one consequence.');
                return;
            }
        }

        if (!profile?.token || !profile?.id) {
            showErrorMessage('Authentication required. Please log in again.');
            return;
        }

        try {
            setLoading(true);

            // Prepare description based on report type
            let description = reportDescription;

            if (selectedReportType === ReportType.CheckIn) {
                description = `Attitude: ${attitude}.\nSocialization: ${socialization}`;
            } else if (selectedReportType === ReportType.ABC) {
                const antecedentStr = selectedAntecedents.join(', ');
                const behaviorStr = selectedBehaviors.join(', ');
                const consequenceStr = selectedConsequences.join(', ');
                description = `Antecedent: ${antecedentStr}. Behavior: ${behaviorStr}. Consequences: ${consequenceStr}.`;
            }

            // Call API to create report
            const response = await apiService.createReport(
                {
                    reportType: selectedReportType,
                    description: description,
                    moodType: selectedReportType === ReportType.Mood ? selectedMoodtype?.toString() : null,
                    reportedByName: profile.fullName || profile.email,
                    reportedById: profile.id,
                    studentId: parseInt(selectedStudent.studentId, 10)
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
                antecedents: selectedReportType === ReportType.ABC ? selectedAntecedents : undefined,
                behaviors: selectedReportType === ReportType.ABC ? selectedBehaviors : undefined,
                consequences: selectedReportType === ReportType.ABC ? selectedConsequences : undefined,
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
                if (selectedReportType === ReportType.ABC) {
                    switch (abcSubStep) {
                        case 1:
                            return 'ABC Report - Antecedent';
                        case 2:
                            return 'ABC Report - Behavior';
                        case 3:
                            return 'ABC Report - Consequence';
                    }
                }
                return `Add ${selectedReportType} Report`;
            default:
                return 'Add Report';
        }
    };

    // ABC checkbox toggle helpers
    const toggleAntecedent = (item: string) => {
        setSelectedAntecedents(prev =>
            prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
        );
    };

    const toggleBehavior = (item: string) => {
        setSelectedBehaviors(prev =>
            prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
        );
    };

    const toggleConsequence = (item: string) => {
        setSelectedConsequences(prev =>
            prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
        );
    };

    const renderCheckboxList = (
        items: readonly string[],
        selectedItems: string[],
        toggleItem: (item: string) => void
    ) => (
        <ScrollView style={{ maxHeight: windowHeight * 0.4, width: '100%' }}>
            {items.map((item) => (
                <Pressable
                    key={item}
                    onPress={() => toggleItem(item)}
                    className="flex-row items-center py-2 px-2"
                >
                    <Checkbox
                        status={selectedItems.includes(item) ? 'checked' : 'unchecked'}
                        onPress={() => toggleItem(item)}
                        color="#9cb43c"
                    />
                    <Text className="text-white text-base ml-2 flex-1">{item}</Text>
                </Pressable>
            ))}
        </ScrollView>
    );

    const renderABCStep = () => {
        switch (abcSubStep) {
            case 1:
                return (
                    <View className="items-center w-full">
                        <Text className="text-gray-400 text-base mb-4">Select all antecedents that apply</Text>
                        {renderCheckboxList(ABC_ANTECEDENTS, selectedAntecedents, toggleAntecedent)}
                        <BaseButton
                            title="Next"
                            className="bg-jarvisPrimary rounded-lg items-center active:opacity-70 mt-4 w-full"
                            textClassName="text-black text-base font-semibold"
                            onPress={() => setAbcSubStep(2)}
                        />
                    </View>
                );
            case 2:
                return (
                    <View className="items-center w-full">
                        <Text className="text-gray-400 text-base mb-4">Select all behaviors that apply</Text>
                        {renderCheckboxList(ABC_BEHAVIORS, selectedBehaviors, toggleBehavior)}
                        <BaseButton
                            title="Next"
                            className="bg-jarvisPrimary rounded-lg items-center active:opacity-70 mt-4 w-full"
                            textClassName="text-black text-base font-semibold"
                            onPress={() => setAbcSubStep(3)}
                        />
                    </View>
                );
            case 3:
                return (
                    <View className="items-center w-full">
                        <Text className="text-gray-400 text-base mb-4">Select all consequences that apply</Text>
                        {renderCheckboxList(ABC_CONSEQUENCES, selectedConsequences, toggleConsequence)}
                    </View>
                );
            default:
                return null;
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
            case ReportType.ABC:
                return renderABCStep();

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

        // For ABC, only show confirm button on the final sub-step
        if (selectedReportType === ReportType.ABC && abcSubStep !== 3) {
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
