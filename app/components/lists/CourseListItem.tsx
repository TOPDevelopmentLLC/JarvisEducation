import { Text, View } from "react-native";
import { Course } from "lib/models/course";
import JarvisButton from "components/buttons/JarvisButton";
import clsx from "clsx";


export interface CourseListItemProps {
    className?: string;
    course: Course;
    detailsButtonPressed: (course:Course) => void;
}

const CourseListItem = ({
    className,
    course,
    detailsButtonPressed
}: CourseListItemProps) => {

    return (
        <View className={clsx(className, 'flex-row items-center')}>
            <Text className="text-white">{course.title}</Text>
            <JarvisButton title={"Details"} onPress={() => detailsButtonPressed(course)} />
        </View>
    )
}

export default CourseListItem;