import { Teacher } from "lib/teacher";
import TeacherListItem from "components/lists/TeacherListItem";
import { FlatList, StyleProp, ViewStyle } from "react-native";


export interface TeacherListProps {
    teachers: Teacher[];
    style?: StyleProp<ViewStyle>;
}

const TeacherList = ({
    teachers,
    style
}: TeacherListProps) => {

    const handleDetailsButtonPressed = (teacher: Teacher) => {
                
    }

    return (
        <FlatList
            style={style}
            data={teachers}
            renderItem={data => {
                return (
                    <TeacherListItem 
                        teacher={data.item} 
                        detailsButtonPressed={handleDetailsButtonPressed}
                    />
                )
            }}
        />
    )
}

export default TeacherList;