import { Text, View } from "react-native";
import { Course } from "lib/course";
import JarvisButton from "components/buttons/JarvisButton";


export interface CourseListItemProps {
    course: Course;
    detailsButtonPressed: (course:Course) => void;
}

const CourseListItem = ({
    course,
    detailsButtonPressed
}: CourseListItemProps) => {

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <Text style={{color: 'white'}}>{course.title}</Text>
            <JarvisButton title={"Details"} onPress={() => detailsButtonPressed(course)} />
        </View>
    )
}

export default CourseListItem;