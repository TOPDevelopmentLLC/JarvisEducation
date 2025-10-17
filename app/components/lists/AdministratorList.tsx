import { Administrator } from "lib/models/administrator";
import AdministratorListItem from "components/lists/AdministratorListItem";
import { ScrollView } from "react-native";
import NoDataView, { DataType } from "components/NoDataView";


export interface AdministratorListProps {
    className?: string;
    administrators: Administrator[];
    currentSearchText: string;
    editButtonPressed: (admin:Administrator) => void;
    deleteButtonPressed: (admin:Administrator) => void;
    adminItemPressed: (admin:Administrator) => void;
}

const AdministratorList = ({
    className,
    administrators,
    currentSearchText,
    editButtonPressed,
    deleteButtonPressed,
    adminItemPressed,
}: AdministratorListProps) => {

    return (
        <ScrollView 
            className={className}
            showsVerticalScrollIndicator={false}>
                {administrators.length > 0 ? (
                    administrators.map((admin) => (
                        <AdministratorListItem
                            key={admin.adminId}
                            admin={admin}
                            onEdit={editButtonPressed}
                            onDelete={deleteButtonPressed}
                            onPress={adminItemPressed}
                        />
                    ))
                ) : (
                    <NoDataView 
                        className="flex-1 py-20" 
                        dataType={DataType.ADMIN} 
                        currentSearchText={currentSearchText}
                    />
                )
            }
        </ScrollView>
    )
}

export default AdministratorList;