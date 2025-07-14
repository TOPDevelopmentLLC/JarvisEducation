import { Student } from "lib/models/student"
import StudentListItem from "components/lists/StudentListItem";
import { FlatList } from "react-native";
import { useStoredStudentData } from "components/contexts/StudentContext";


export interface StudentListProps {
    className?: string;
    students: Student[];
}

const StudentList = ({
    className,
    students,
}: StudentListProps) => {
    const { selectedStudent, setSelectedStudent } = useStoredStudentData();

    const handleDetailsButtonPressed = (student: Student) => {
            
    }

    const handleListItemClicked = (student: Student) => {
        if (selectedStudent?.studentId === student.studentId) {
            setSelectedStudent(null);
        } else {
            setSelectedStudent(student);
        }
    }

    return (
        <FlatList
            className={className}
            data={students}
            keyExtractor={(item) => item.studentId}
            renderItem={data => {
                return (
                    <StudentListItem 
                        className={data.item.studentId === selectedStudent?.studentId ? 'bg-selectedListItemBackgroundColor' : 'bg-listItemBackgroundColor'}
                        student={data.item} 
                        detailsButtonPressed={handleDetailsButtonPressed}
                        onListItemClicked={() => handleListItemClicked(data.item)}
                    />
                )
            }}
        />
    )
}

export default StudentList;