import { View, Text } from "react-native";
import JarvisModal from "./JarvisModal";
import IconContainer, { IconType } from "components/IconContainer";
import JarvisButton from "components/buttons/JarvisButton";
import { useState } from "react";
import { MoodType, ReportType } from "lib/models/report";
import { Chip } from "react-native-paper";
import StudentList from "components/lists/StudentList";
import { mockStudentData } from "lib/mockData";
import { useStoredStudentData } from "components/contexts/StudentContext";
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
    const [selectedStudent,setSelectedStudent] = useState<Student|null>();
    const showErrorMessage = useErrorSnackbar();

    const addButtonPressed = () => {
        if (selectedStudent === null) {
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
        //todo: start activity indicator
        //todo: add api call to add student
        //todo: end activity indicator on response
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
        >
            <View className="items-center">
                <StudentList 
                    className="w-[100%]"
                    students={mockStudentData}  
                    selectedStudent={selectedStudent}
                    studentItemPressed={setSelectedStudent}            
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
            <JarvisButton className="mt-4" title={"Add"} onPress={addButtonPressed} />
            <JarvisButton className="mt-2" title={"Cancel"} onPress={onDismiss} />
        </JarvisModal>
    )
}

export default AddReportModal;