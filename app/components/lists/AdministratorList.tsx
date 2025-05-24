import { Administrator } from "lib/administrator";
import AdministratorListItem from "components/lists/AdministratorListItem";
import { FlatList, StyleProp, ViewStyle } from "react-native";


export interface AdministratorListProps {
    administrators: Administrator[];
    style?: StyleProp<ViewStyle>;
}

const AdministratorList = ({
    administrators,
    style
}: AdministratorListProps) => {

    const handleDetailsButtonPressed = (admin: Administrator) => {

    }

    return (
        <FlatList
            style={style}
            data={administrators}
            renderItem={data => {
                return (
                    <AdministratorListItem 
                        admin={data.item} 
                        detailsButtonPressed={handleDetailsButtonPressed}
                    />
                )
            }}
        />
    )
}

export default AdministratorList;