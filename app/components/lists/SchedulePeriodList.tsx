import { FlatList, ViewStyle } from "react-native";
import { SchedulePeriod } from "lib/models/schoolYearSettings";
import SchedulePeriodListItem from "./SchedulePeriodListItem";


export interface SchedulePeriodListProps {
    className?: string;
    schedulePeriods: SchedulePeriod[];
    deleteButtonPressed?: (schedulePeriod: SchedulePeriod) => void;
    schedulePeriodItemPressed?: (schedulePeriod: SchedulePeriod) => void;
    style?: ViewStyle;
}

const SchedulePeriodList = ({
    className,
    schedulePeriods,
    deleteButtonPressed,
    schedulePeriodItemPressed,
    style
}: SchedulePeriodListProps) => {
    return (
        <FlatList
            className={className}
            style={style}
            data={schedulePeriods}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <SchedulePeriodListItem
                    key={item.id}
                    schedulePeriod={item}
                    onDelete={deleteButtonPressed}
                    onPress={schedulePeriodItemPressed}
                />
            )}
        />
    )
}

export default SchedulePeriodList;
