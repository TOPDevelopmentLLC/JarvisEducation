import { Teacher } from "lib/models/teacher";
import TeacherListItem from "components/lists/TeacherListItem";
import { FlatList } from "react-native";


export interface TeacherListProps {
    className?: string;
    teachers: Teacher[];
}

const TeacherList = ({
    className,
    teachers,
}: TeacherListProps) => {

    const handleDetailsButtonPressed = (teacher: Teacher) => {
                
    }

    return (
        <FlatList
            className={className}
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