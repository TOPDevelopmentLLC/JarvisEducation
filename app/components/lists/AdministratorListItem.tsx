import clsx from "clsx";
import JarvisButton from "components/buttons/JarvisButton";
import { Administrator } from "lib/models/administrator"
import { Text, View } from "react-native"


export interface AdministratorListItemProps {
    className?: string;
    admin: Administrator;
    detailsButtonPressed: (admin:Administrator) => void;
}

const AdministratorListItem = ({
    className,
    admin,
    detailsButtonPressed
}: AdministratorListItemProps) => {

    return (
        <View className={clsx("flex-row items-center")}>
            <Text className="text-white">{admin.name}</Text>
            <JarvisButton title={"Details"} onPress={() => detailsButtonPressed(admin)} />
        </View>
    )
}

export default AdministratorListItem;