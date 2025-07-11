import { Text, View } from "react-native";
import { Student } from "lib/models/student"
import JarvisButton from "components/buttons/JarvisButton";
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
        <View className={clsx(className, 'flex-row items-center')}>
            <Text className="text-white">{student.name}</Text>
            <JarvisButton title={"Details"} onPress={() => detailsButtonPressed(student)} />
        </View>
    )
}

export default StudentListItem;