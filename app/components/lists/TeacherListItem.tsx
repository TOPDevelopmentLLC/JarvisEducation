import { Text, View } from "react-native";
import { Teacher } from "lib/teacher";


export interface TeacherListItemProps {
    teacher: Teacher;
}

const TeacherListItem = ({
    teacher
}: TeacherListItemProps) => {


    return (
        <View>
            <Text>{teacher.name}</Text>
        </View>
    )
}

export default TeacherListItem;