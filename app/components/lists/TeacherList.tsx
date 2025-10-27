import { Teacher } from "lib/models/teacher";
import TeacherListItem from "components/lists/TeacherListItem";
import { FlatList, ScrollView, ViewStyle } from "react-native";
import { useStoredTeacherData } from "components/contexts/TeacherContext";
import { router } from "expo-router";
import NoDataView, { DataType } from "components/NoDataView";


export interface TeacherListProps {
    className?: string;
    teachers: Teacher[];
    currentSearchText?: string;
    selectedTeacher?: Teacher | null;
    editButtonPressed?: (teacher:Teacher) => void;
    deleteButtonPressed?: (teacher:Teacher) => void;
    teacherItemPressed?: (teacher:Teacher) => void;
    style?: ViewStyle;
}

const TeacherList = ({
    className,
    teachers,
    currentSearchText = '',
    selectedTeacher,
    editButtonPressed,
    deleteButtonPressed,
    teacherItemPressed,
    style
}: TeacherListProps) => {

    return (
        <ScrollView
            className={className}
            style={style}
            showsVerticalScrollIndicator={false}>
                {teachers.length > 0 ? (
                    teachers.map((teacher) => (
                        <TeacherListItem
                            key={teacher.teacherId}
                            teacher={teacher}
                            isSelected={selectedTeacher?.teacherId === teacher.teacherId}
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