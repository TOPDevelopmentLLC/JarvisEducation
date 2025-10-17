import { Course } from "lib/models/course";
import CourseListItem from "components/lists/CourseListItem";
import { ScrollView } from "react-native";
import NoDataView, { DataType } from "components/NoDataView";


export interface CourseListProps {
    className?: string;
    courses: Course[];
    currentSearchText: string;
    editButtonPressed: (course:Course) => void;
    deleteButtonPressed: (course:Course) => void;
    courseItemPressed: (course:Course) => void;
}

const CourseList = ({
    className,
    courses,
    currentSearchText,
    editButtonPressed,
    deleteButtonPressed,
    courseItemPressed,
}: CourseListProps) => {

    return (
        <ScrollView 
            className={className}
            showsVerticalScrollIndicator={false}>
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <CourseListItem
                            key={course.courseId}
                            course={course}
                            onEdit={editButtonPressed}
                            onDelete={deleteButtonPressed}
                            onPress={courseItemPressed}
                        />
                    ))
                ) : (
                    <NoDataView 
                        className="flex-1 py-20" 
                        dataType={DataType.COURSE} 
                        currentSearchText={currentSearchText}
                    />
                )
            }
        </ScrollView>
    )
}

export default CourseList;