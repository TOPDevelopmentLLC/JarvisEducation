import clsx from "clsx";
import JarvisButton, { JarvisButtonType } from "components/buttons/JarvisButton";
import { Administrator } from "lib/models/administrator"
import { Pressable, Text, View } from "react-native"


export interface AdministratorListItemProps {
    className?: string;
    admin: Administrator;
    detailsButtonPressed: (admin:Administrator) => void;
    onListItemClicked: () => void;
}

const AdministratorListItem = ({
    className,
    admin,
    detailsButtonPressed,
    onListItemClicked,
}: AdministratorListItemProps) => {

    return (
        <View className="w-screen items-center">
            <Pressable 
                className={clsx("flex-row items-center w-1/2 rounded-lg p-2 my-1 justify-between", className)}
                onPress={onListItemClicked}>
                <Text className="">{admin.name}</Text>
                <JarvisButton 
                    type={JarvisButtonType.transparentBorder} 
                    title={"Details"} 
                    onPress={() => detailsButtonPressed(admin)} 
                />
            </Pressable>
        </View>
    )
}

export default AdministratorListItem;