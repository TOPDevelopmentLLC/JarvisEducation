import { Administrator } from "lib/models/administrator";
import AdministratorListItem from "components/lists/AdministratorListItem";
import { FlatList } from "react-native";
import { useState } from "react";


export interface AdministratorListProps {
    className?: string;
    administrators: Administrator[];
}

const AdministratorList = ({
    className,
    administrators,
}: AdministratorListProps) => {
    const [selectedId, setSelectedId] = useState<string|null>(null);

    const handleDetailsButtonPressed = (admin: Administrator) => {

    }

    const handleListItemClicked = (adminId:string) => {
        if (selectedId === adminId) {
            setSelectedId(null);
        } else {
            setSelectedId(adminId);
        }
    }

    return (
        <FlatList
            className={className}
            data={administrators}
            keyExtractor={(item) => item.adminId}
            renderItem={data => {
                return (
                    <AdministratorListItem 
                        className={data.item.adminId === selectedId ? 'bg-selectedListItemBackgroundColor' : 'bg-listItemBackgroundColor'}
                        admin={data.item} 
                        detailsButtonPressed={handleDetailsButtonPressed}
                        onListItemClicked={() => handleListItemClicked(data.item.adminId)}
                    />
                )
            }}
        />
    )
}

export default AdministratorList;