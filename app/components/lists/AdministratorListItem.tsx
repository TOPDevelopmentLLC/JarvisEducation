import JarvisButton from "components/buttons/JarvisButton";
import { Administrator } from "lib/administrator"
import { Text, View } from "react-native"


export interface AdministratorListItemProps {
    admin: Administrator;
    detailsButtonPressed: (admin:Administrator) => void;
}

const AdministratorListItem = ({
    admin,
    detailsButtonPressed
}: AdministratorListItemProps) => {

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <Text style={{color: 'white'}}>{admin.name}</Text>
            <JarvisButton title={"Details"} onPress={() => detailsButtonPressed(admin)} />
        </View>
    )
}

export default AdministratorListItem;