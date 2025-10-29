import { View, Dimensions } from "react-native";
import JarvisModal from "./JarvisModal";
import { IconType } from "components/IconContainer";
import { useState } from "react";
import { MoodType, ReportType } from "lib/models/report";
import StudentList from "components/lists/StudentList";
import { useStoredStudentData } from "components/contexts/StudentContext";
import { useStoredReportData } from "components/contexts/ReportContext";
import JarvisPaperTextInput from "components/JarvisPaperTextInput";
import MoodLabelList from "components/lists/MoodLabelList";
import ReportTypeList from "components/lists/ReportTypeList";
import { useErrorSnackbar } from "components/contexts/SnackbarContext";
import { Student } from "lib/models/student";


export interface AddReportModalProps {
    isVisible: boolean;
    onDismiss?: () => void;
}

const AddReportModal = ({
    isVisible,
    onDismiss,
}: AddReportModalProps) => {
    const [selectedReportType,setSelectedReportType] = useState<ReportType|null>(null);
    const [reportDescription,setReportDescription] = useState('');
    const [selectedMoodtype,setSelectedMoodType] = useState<MoodType|null>(null);
    const [selectedStudent,setSelectedStudent] = useState<Student|null>(null);
    const showErrorMessage = useErrorSnackbar();
    const { students, addReportToStudent } = useStoredStudentData();
    const { addReport, reports } = useStoredReportData();
    const windowHeight = Dimensions.get('window').height;

    const addButtonPressed = () => {
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
        if ((selectedReportType === ReportType.Behavior ||
            selectedReportType === ReportType.Conflict ||
            selectedReportType === ReportType.Expelled ||
            selectedReportType === ReportType.Secluded ||
            selectedReportType === ReportType.SIP) &&
            reportDescription.length === 0) {
            showErrorMessage('Please enter a description to continue.');
            return;
        }

        // Generate new ID and add report
        const newId = (reports.length + 1).toString();
        addReport({
            reportId: newId,
            type: selectedReportType,
            description: reportDescription || selectedMoodtype?.toString() || '',
            studentId: selectedStudent.studentId
        });

        // Add report to student's reportIds
        addReportToStudent(selectedStudent.studentId, newId);

        // Reset form and close modal
        setSelectedReportType(null);
        setReportDescription('');
        setSelectedMoodType(null);
        setSelectedStudent(null);
        onDismiss?.();
    }

    const reportTypeClicked = (reportType:ReportType) => {
        if (selectedReportType === ReportType.Mood && selectedMoodtype !== null) {
            setSelectedMoodType(null);
        }
        if (selectedReportType === reportType) {
            setSelectedReportType(null);
            return;
        }
        setSelectedReportType(reportType);
    }

    return (
        <JarvisModal
            headerProps={{
                title: 'Add Report',
                icon: {
                    type: IconType.Feather,
                    name: 'file-plus',
                    color: '#000000',
                    size: 32
                }
            }}
            isVisible={isVisible}
            onDismiss={onDismiss}
            confirmButtonProps={{
                title: "Add",
                onPress: addButtonPressed
            }}
        >
            <View className="items-center">
                <StudentList
                    className="w-[100%]"
                    students={students}
                    selectedStudent={selectedStudent}
                    studentItemPressed={setSelectedStudent}
                    style={{
                        maxHeight: windowHeight * 0.4
                    }}
                />
                <ReportTypeList 
                    className="mt-2"
                    selectedReportType={selectedReportType} 
                    reportTypeSelected={(reportType) => reportTypeClicked(reportType)} 
                />
                {
                    selectedReportType === ReportType.Mood && (
                        <MoodLabelList 
                            className="mt-2"
                            selectedMoodType={selectedMoodtype}
                            moodTypeSelected={(moodtype) => setSelectedMoodType(moodtype)} 
                        />
                    )
                }
                {
                    (
                        selectedReportType === ReportType.Behavior ||
                        selectedReportType === ReportType.Conflict ||
                        selectedReportType === ReportType.Expelled ||
                        selectedReportType === ReportType.Mood ||
                        selectedReportType === ReportType.Secluded ||
                        selectedReportType === ReportType.SIP
                    ) && (
                        <JarvisPaperTextInput 
                            placeholder={"Description"} 
                            onTextChange={(description) => setReportDescription(description)} 
                            disabled={selectedReportType === ReportType.Mood}
                            defaultValue={selectedReportType === ReportType.Mood ? selectedMoodtype?.toString() : reportDescription}
                            multiline={true}
                            style={{
                                width: 500,
                                marginTop: 12
                            }}
                        />
                    )
                }
            </View>
        </JarvisModal>
    )
}

export default AddReportModal;