import { Text, View } from "react-native";
import { Course } from "lib/models/course";
import JarvisButton, { JarvisButtonType } from "components/buttons/JarvisButton";
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
        <View className="w-screen items-center">
            <View className={clsx("flex-row items-center w-1/2 bg-listItemBackgroundColor rounded-lg p-2 my-1 justify-between", className)}>
                <Text className="">{course.title}</Text>
                <JarvisButton 
                    type={JarvisButtonType.transparentBorder} 
                    title={"Details"} 
                    onPress={() => detailsButtonPressed(course)} 
                />
            </View>
        </View>
    )
}

export default CourseListItem;