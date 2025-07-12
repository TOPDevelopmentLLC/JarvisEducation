import { Student } from "lib/models/student"
import StudentListItem from "components/lists/StudentListItem";
import { FlatList } from "react-native";
import { useState } from "react";


export interface StudentListProps {
    className?: string;
    students: Student[];
}

const StudentList = ({
    className,
    students,
}: StudentListProps) => {
    const [selectedId, setSelectedId] = useState<string|null>(null);

    const handleDetailsButtonPressed = (student: Student) => {
            
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
            data={students}
            keyExtractor={(item) => item.studentId}
            renderItem={data => {
                return (
                    <StudentListItem 
                        className={data.item.studentId === selectedId ? 'bg-selectedListItemBackgroundColor' : 'bg-listItemBackgroundColor'}
                        student={data.item} 
                        detailsButtonPressed={handleDetailsButtonPressed}
                        onListItemClicked={() => handleListItemClicked(data.item.studentId)}
                    />
                )
            }}
        />
    )
}

export default StudentList;