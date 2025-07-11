import { Course } from "lib/models/course";
import CourseListItem from "components/lists/CourseListItem";
import { FlatList } from "react-native";


export interface CourseListProps {
    className?: string;
    courses: Course[];
}

const CourseList = ({
    className,
    courses,
}: CourseListProps) => {

    const handleDetailsButtonPressed = (course: Course) => {
    
    }

    return (
        <FlatList
            className={className}
            data={courses}
            renderItem={data => {
                return (
                    <CourseListItem 
                        course={data.item} 
                        detailsButtonPressed={handleDetailsButtonPressed}
                    />
                )
            }}
        />
    )
}

export default CourseList;