import { Text, View } from "react-native";
import { Student } from "../../lib/student"


export interface StudentListItemProps {
    student: Student;
}

const StudentListItem = ({
    student
}: StudentListItemProps) => {
    return (
        <View>
            <Text>{student.name}</Text>
        </View>
    )
}

export default StudentListItem;