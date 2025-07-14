import { Administrator } from "lib/models/administrator";
import AdministratorListItem from "components/lists/AdministratorListItem";
import { FlatList } from "react-native";
import { useState } from "react";
import { useStoredAdminData } from "components/contexts/AdminContext";


export interface AdministratorListProps {
    className?: string;
    administrators: Administrator[];
}

const AdministratorList = ({
    className,
    administrators,
}: AdministratorListProps) => {
    const { selectedAdmin, setSelectedAdmin } = useStoredAdminData();

    const handleDetailsButtonPressed = (admin: Administrator) => {

    }

    const handleListItemClicked = (admin: Administrator) => {
        if (selectedAdmin?.adminId === admin.adminId) {
            setSelectedAdmin(null);
        } else {
            setSelectedAdmin(admin);
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
                        className={data.item.adminId === selectedAdmin?.adminId ? 'bg-selectedListItemBackgroundColor' : 'bg-listItemBackgroundColor'}
                        admin={data.item} 
                        detailsButtonPressed={handleDetailsButtonPressed}
                        onListItemClicked={() => handleListItemClicked(data.item)}
                    />
                )
            }}
        />
    )
}

export default AdministratorList;