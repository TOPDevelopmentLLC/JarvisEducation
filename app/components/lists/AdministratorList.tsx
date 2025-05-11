import { Administrator } from "lib/administrator";
import AdministratorListItem from "components/lists/AdministratorListItem";


export interface AdministratorListProps {
    administrators: Administrator[];
}

const AdministratorList = ({
    administrators
}: AdministratorListProps) => {

    return (
        <>
            {
                administrators.map(admin => {
                    return (
                        <AdministratorListItem admin={admin} />
                    )
                })
            }
        </>
    )
}

export default AdministratorList;