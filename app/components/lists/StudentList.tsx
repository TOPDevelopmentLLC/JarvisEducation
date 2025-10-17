import { Student } from "lib/models/student"
import StudentListItem from "components/lists/StudentListItem";
import { FlatList, ScrollView } from "react-native";
import { useStoredStudentData } from "components/contexts/StudentContext";
import { router } from "expo-router";
import NoDataView, { DataType } from "components/NoDataView";


export interface StudentListProps {
    className?: string;
    students: Student[];
    currentSearchText: string;
    editButtonPressed: (student:Student) => void;
    deleteButtonPressed: (student:Student) => void;
    studentItemPressed: (student:Student) => void;
}

const StudentList = ({
    className,
    students,
    currentSearchText,
    editButtonPressed,
    deleteButtonPressed,
    studentItemPressed,
}: StudentListProps) => {


    return (
        <ScrollView 
            className={className}
            showsVerticalScrollIndicator={false}>
                {students.length > 0 ? (
                    students.map((student) => (
                        <StudentListItem
                            key={student.studentId}
                            student={student}
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