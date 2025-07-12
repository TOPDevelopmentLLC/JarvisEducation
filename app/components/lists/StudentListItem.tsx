import { Text, View } from "react-native";
import { Student } from "lib/models/student"
import JarvisButton, { JarvisButtonType } from "components/buttons/JarvisButton";
import clsx from "clsx";


export interface StudentListItemProps {
    className?: string;
    student: Student;
    detailsButtonPressed: (student:Student) => void;
}

const StudentListItem = ({
    className,
    student,
    detailsButtonPressed
}: StudentListItemProps) => {
    return (
        <View className="w-screen items-center">
            <View className={clsx("flex-row items-center w-1/2 bg-listItemBackgroundColor rounded-lg p-2 my-1 justify-between", className)}>
                <Text className="">{student.name}</Text>
                <JarvisButton 
                    type={JarvisButtonType.transparentBorder} 
                    title={"Details"} 
                    onPress={() => detailsButtonPressed(student)} 
                />
            </View>
        </View>
    )
}

export default StudentListItem;