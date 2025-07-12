import { Pressable, Text, View } from "react-native";
import { Course } from "lib/models/course";
import JarvisButton, { JarvisButtonType } from "components/buttons/JarvisButton";
import clsx from "clsx";


export interface CourseListItemProps {
    className?: string;
    course: Course;
    detailsButtonPressed: (course:Course) => void;
    onListItemClicked: () => void;
}

const CourseListItem = ({
    className,
    course,
    detailsButtonPressed,
    onListItemClicked
}: CourseListItemProps) => {

    return (
        <View className="w-screen items-center">
            <Pressable 
                className={clsx("flex-row items-center w-1/2 rounded-lg p-2 my-1 justify-between", className)}
                onPress={onListItemClicked}>
                <Text className="">{course.title}</Text>
                <JarvisButton 
                    type={JarvisButtonType.transparentBorder} 
                    title={"Details"} 
                    onPress={() => detailsButtonPressed(course)} 
                />
            </Pressable>
        </View>
    )
}

export default CourseListItem;