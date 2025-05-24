import { Text, View } from "react-native";
import { Student } from "lib/student"
import JarvisButton from "components/buttons/JarvisButton";


export interface StudentListItemProps {
    student: Student;
    detailsButtonPressed: (student:Student) => void;
}

const StudentListItem = ({
    student,
    detailsButtonPressed
}: StudentListItemProps) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <Text style={{color: 'white'}}>{student.name}</Text>
            <JarvisButton title={"Details"} onPress={() => detailsButtonPressed(student)} />
        </View>
    )
}

export default StudentListItem;