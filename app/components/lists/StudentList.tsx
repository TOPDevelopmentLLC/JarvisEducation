import { Student } from "lib/models/student"
import StudentListItem from "components/lists/StudentListItem";
import { FlatList, ScrollView, ViewStyle } from "react-native";
import { useStoredStudentData } from "components/contexts/StudentContext";
import { router } from "expo-router";
import NoDataView, { DataType } from "components/NoDataView";


export interface StudentListProps {
    className?: string;
    students: Student[];
    currentSearchText?: string;
    selectedStudent?: Student | null;
    editButtonPressed?: (student:Student) => void;
    deleteButtonPressed?: (student:Student) => void;
    studentItemPressed?: (student:Student) => void;
    style?: ViewStyle;
}

const StudentList = ({
    className,
    students,
    currentSearchText = '',
    selectedStudent,
    editButtonPressed,
    deleteButtonPressed,
    studentItemPressed,
    style,
}: StudentListProps) => {


    return (
        <ScrollView
            className={className}
            style={style}
            showsVerticalScrollIndicator={false}>
                {students.length > 0 ? (
                    students.map((student) => (
                        <StudentListItem
                            key={student.studentId}
                            student={student}
                            isSelected={selectedStudent?.studentId === student.studentId}
                            onEdit={editButtonPressed}
                            onDelete={deleteButtonPressed}
                            onPress={studentItemPressed}
                        />
                    ))
                ) : (
                    <NoDataView
                        className="flex-1 py-20"
                        dataType={DataType.STUDENT}
                        currentSearchText={currentSearchText}
                    />
                )
            }
        </ScrollView>
    )
}

export default StudentList;