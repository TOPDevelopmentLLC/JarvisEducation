import { Text, View } from "react-native";
import { Teacher } from "lib/models/teacher";
import JarvisButton, { JarvisButtonType } from "components/buttons/JarvisButton";
import clsx from "clsx";


export interface TeacherListItemProps {
    className?: string;
    teacher: Teacher;
    detailsButtonPressed: (teacher:Teacher) => void;
}

const TeacherListItem = ({
    className,
    teacher,
    detailsButtonPressed
}: TeacherListItemProps) => {


    return (
        <View className="w-screen items-center">
            <View className={clsx("flex-row items-center w-1/2 bg-listItemBackgroundColor rounded-lg p-2 my-1 justify-between", className)}>
                <Text className="">{teacher.name}</Text>
                <JarvisButton 
                    type={JarvisButtonType.transparentBorder} 
                    title={"Details"} 
                    onPress={() => detailsButtonPressed(teacher)} 
                />
            </View>
        </View>
    )
}

export default TeacherListItem;