import { Text, View } from "react-native";
import { Teacher } from "lib/teacher";
import JarvisButton from "components/buttons/JarvisButton";


export interface TeacherListItemProps {
    teacher: Teacher;
    detailsButtonPressed: (teacher:Teacher) => void;
}

const TeacherListItem = ({
    teacher,
    detailsButtonPressed
}: TeacherListItemProps) => {


    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <Text style={{color: 'white'}}>{teacher.name}</Text>
            <JarvisButton title={"Details"} onPress={() => detailsButtonPressed(teacher)} />
        </View>
    )
}

export default TeacherListItem;