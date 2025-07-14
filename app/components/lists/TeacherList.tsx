import { Teacher } from "lib/models/teacher";
import TeacherListItem from "components/lists/TeacherListItem";
import { FlatList } from "react-native";
import { useStoredTeacherData } from "components/contexts/TeacherContext";


export interface TeacherListProps {
    className?: string;
    teachers: Teacher[];
}

const TeacherList = ({
    className,
    teachers,
}: TeacherListProps) => {
    const { selectedTeacher, setSelectedTeacher } = useStoredTeacherData();

    const handleDetailsButtonPressed = (teacher: Teacher) => {
                
    }

    const handleListItemClicked = (teacher:Teacher) => {
        if (selectedTeacher?.teacherId === teacher.teacherId) {
            setSelectedTeacher(null);
        } else {
            setSelectedTeacher(teacher);
        }
    }

    return (
        <FlatList
            className={className}
            data={teachers}
            keyExtractor={(item) => item.teacherId}
            renderItem={data => {
                return (
                    <TeacherListItem 
                        className={data.item.teacherId === selectedTeacher?.teacherId ? 'bg-selectedListItemBackgroundColor' : 'bg-listItemBackgroundColor'}
                        teacher={data.item} 
                        detailsButtonPressed={handleDetailsButtonPressed}
                        onListItemClicked={() => handleListItemClicked(data.item)}
                    />
                )
            }}
        />
    )
}

export default TeacherList;