import { Student } from "lib/models/student"
import StudentListItem from "components/lists/StudentListItem";
import { FlatList } from "react-native";


export interface StudentListProps {
    className?: string;
    students: Student[];
}

const StudentList = ({
    className,
    students,
}: StudentListProps) => {

    const handleDetailsButtonPressed = (student: Student) => {
            
    }

    return (
        <FlatList
            className={className}
            data={students}
            renderItem={data => {
                return (
                    <StudentListItem 
                        student={data.item} 
                        detailsButtonPressed={handleDetailsButtonPressed}
                    />
                )
            }}
        />
    )
}

export default StudentList;