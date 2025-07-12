import clsx from "clsx";
import JarvisButton, { JarvisButtonType } from "components/buttons/JarvisButton";
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
        <View className="w-screen items-center">
            <View className={clsx("flex-row items-center w-1/2 bg-listItemBackgroundColor rounded-lg p-2 my-1 justify-between", className)}>
                <Text className="">{admin.name}</Text>
                <JarvisButton 
                    type={JarvisButtonType.transparentBorder} 
                    title={"Details"} 
                    onPress={() => detailsButtonPressed(admin)} 
                />
            </View>
        </View>
    )
}

export default AdministratorListItem;