import { Text, View } from "react-native";
import { Teacher } from "lib/models/teacher";
import JarvisButton from "components/buttons/JarvisButton";
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
        <View className={clsx(className, 'flex-row items-center')}>
            <Text className="text-white">{teacher.name}</Text>
            <JarvisButton title={"Details"} onPress={() => detailsButtonPressed(teacher)} />
        </View>
    )
}

export default TeacherListItem;