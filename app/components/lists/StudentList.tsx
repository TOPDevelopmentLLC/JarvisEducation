import { Student } from "lib/student"
import StudentListItem from "components/lists/StudentListItem";


export interface StudentListProps {
    students: Student[];
}

const StudentList = ({
    students
}: StudentListProps) => {

    return (
        <>
            {
                students.map(student => {
                    return (
                        <StudentListItem student={student} />
                    )
                })
            }
        </>
    )
}

export default StudentList;