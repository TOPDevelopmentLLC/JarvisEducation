import { FlatList, ViewStyle } from "react-native";
import { BreakPeriod } from "lib/models/schoolYearSettings";
import BreakPeriodListItem from "./BreakPeriodListItem";


export interface BreakPeriodListProps {
    className?: string;
    breakPeriods: BreakPeriod[];
    deleteButtonPressed?: (breakPeriod: BreakPeriod) => void;
    breakPeriodItemPressed?: (breakPeriod: BreakPeriod) => void;
    style?: ViewStyle;
}

const BreakPeriodList = ({
    className,
    breakPeriods,
    deleteButtonPressed,
    breakPeriodItemPressed,
    style
}: BreakPeriodListProps) => {
    return (
        <FlatList
            className={className}
            style={style}
            data={breakPeriods}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <BreakPeriodListItem
                    key={item.id}
                    breakPeriod={item}
                    onDelete={deleteButtonPressed}
                    onPress={breakPeriodItemPressed}
                />
            )}
        />
    )
}

export default BreakPeriodList;
