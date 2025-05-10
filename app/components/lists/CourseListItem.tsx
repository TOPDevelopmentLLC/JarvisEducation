import { Text, View } from "react-native";
import { Course } from "../../lib/course";


export interface CourseListItemProps {
    course: Course;
}

const CourseListItem = ({
    course
}: CourseListItemProps) => {

    return (
        <View>
            <Text>{course.title}</Text>
        </View>
    )
}

export default CourseListItem;