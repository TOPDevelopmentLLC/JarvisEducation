import { Teacher } from "lib/models/teacher";
import TeacherListItem from "components/lists/TeacherListItem";
import { FlatList } from "react-native";
import { useState } from "react";


export interface TeacherListProps {
    className?: string;
    teachers: Teacher[];
}

const TeacherList = ({
    className,
    teachers,
}: TeacherListProps) => {
    const [selectedId, setSelectedId] = useState<string|null>(null);

    const handleDetailsButtonPressed = (teacher: Teacher) => {
                
    }

    const handleListItemClicked = (adminId:string) => {
        if (selectedId === adminId) {
            setSelectedId(null);
        } else {
            setSelectedId(adminId);
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
                        className={data.item.teacherId === selectedId ? 'bg-selectedListItemBackgroundColor' : 'bg-listItemBackgroundColor'}
                        teacher={data.item} 
                        detailsButtonPressed={handleDetailsButtonPressed}
                        onListItemClicked={() => handleListItemClicked(data.item.teacherId)}
                    />
                )
            }}
        />
    )
}

export default TeacherList;