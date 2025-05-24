import { Course } from "lib/course";
import CourseListItem from "components/lists/CourseListItem";
import { FlatList, StyleProp, ViewStyle } from "react-native";


export interface CourseListProps {
    courses: Course[];
    style?: StyleProp<ViewStyle>;
}

const CourseList = ({
    courses,
    style
}: CourseListProps) => {

    const handleDetailsButtonPressed = (course: Course) => {
    
    }

    return (
        <FlatList
            contentContainerStyle={style}
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