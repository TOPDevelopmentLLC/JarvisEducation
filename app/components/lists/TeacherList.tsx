import { Teacher } from "../../lib/teacher";
import TeacherListItem from "./TeacherListItem";


export interface TeacherListProps {
    teachers: Teacher[];
}

const TeacherList = ({
    teachers
}: TeacherListProps) => {

    return (
        <>
            {
                teachers.map(teacher => {
                    return (
                        <TeacherListItem teacher={teacher} />
                    )
                })
            }
        </>
    )
}

export default TeacherList;