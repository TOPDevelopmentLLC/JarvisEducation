import { Teacher } from "lib/models/teacher";
import TeacherListItem from "components/lists/TeacherListItem";
import { FlatList, ScrollView } from "react-native";
import { useStoredTeacherData } from "components/contexts/TeacherContext";
import { router } from "expo-router";
import NoDataView, { DataType } from "components/NoDataView";


export interface TeacherListProps {
    className?: string;
    teachers: Teacher[];
    currentSearchText: string;
    editButtonPressed: (teacher:Teacher) => void;
    deleteButtonPressed: (teacher:Teacher) => void;
    teacherItemPressed: (teacher:Teacher) => void;
}

const TeacherList = ({
    className,
    teachers,
    currentSearchText,
    editButtonPressed,
    deleteButtonPressed,
    teacherItemPressed
}: TeacherListProps) => {

    return (
        <ScrollView className={className}
            showsVerticalScrollIndicator={false}>
                {teachers.length > 0 ? (
                    teachers.map((teacher) => (
                        <TeacherListItem
                            key={teacher.teacherId}
                            teacher={teacher}
                            onEdit={editButtonPressed}
                            onDelete={deleteButtonPressed}
                            onPress={teacherItemPressed}
                        />
                    ))
                ) : (
                    <NoDataView 
                        className="flex-1 py-20" 
                        dataType={DataType.TEACHER} 
                        currentSearchText={currentSearchText}                    
                    />
                )
            }
        </ScrollView>
    )
}

export default TeacherList;