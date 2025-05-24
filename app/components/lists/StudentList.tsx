import { Student } from "lib/student"
import StudentListItem from "components/lists/StudentListItem";
import { FlatList, StyleProp, ViewStyle } from "react-native";


export interface StudentListProps {
    students: Student[];
    style?: StyleProp<ViewStyle>;
}

const StudentList = ({
    students,
    style
}: StudentListProps) => {

    const handleDetailsButtonPressed = (student: Student) => {
            
    }

    return (
        <FlatList
            contentContainerStyle={style}
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