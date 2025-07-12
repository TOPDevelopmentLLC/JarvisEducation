import { Pressable, Text, View } from "react-native";
import { Student } from "lib/models/student"
import JarvisButton, { JarvisButtonType } from "components/buttons/JarvisButton";
import clsx from "clsx";


export interface StudentListItemProps {
    className?: string;
    student: Student;
    detailsButtonPressed: (student:Student) => void;
    onListItemClicked: () => void;
}

const StudentListItem = ({
    className,
    student,
    detailsButtonPressed,
    onListItemClicked
}: StudentListItemProps) => {
    return (
        <View className="w-screen items-center">
            <Pressable 
                className={clsx("flex-row items-center w-1/2 rounded-lg p-2 my-1 justify-between", className)}
                onPress={onListItemClicked}>
                <Text className="">{student.name}</Text>
                <JarvisButton 
                    type={JarvisButtonType.transparentBorder} 
                    title={"Details"} 
                    onPress={() => detailsButtonPressed(student)} 
                />
            </Pressable>
        </View>
    )
}

export default StudentListItem;