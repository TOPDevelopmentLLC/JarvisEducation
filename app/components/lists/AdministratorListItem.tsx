import { Administrator } from "lib/administrator"
import { Text, View } from "react-native"


export interface AdministratorListItemProps {
    admin: Administrator;
}

const AdministratorListItem = ({
    admin
}: AdministratorListItemProps) => {

    return (
        <View>
            <Text>{admin.name}</Text>
        </View>
    )
}

export default AdministratorListItem;