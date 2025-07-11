import { Administrator } from "lib/models/administrator";
import AdministratorListItem from "components/lists/AdministratorListItem";
import { FlatList } from "react-native";


export interface AdministratorListProps {
    className?: string;
    administrators: Administrator[];
}

const AdministratorList = ({
    className,
    administrators,
}: AdministratorListProps) => {

    const handleDetailsButtonPressed = (admin: Administrator) => {

    }

    return (
        <FlatList
            className={className}
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