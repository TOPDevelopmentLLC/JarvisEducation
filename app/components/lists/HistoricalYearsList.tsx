import { FlatList, ViewStyle } from "react-native";
import { SchoolYearSettings } from "lib/models/schoolYearSettings";
import HistoricalYearListItem from "./HistoricalYearListItem";


export interface HistoricalYearsListProps {
    className?: string;
    historicalYears: SchoolYearSettings[];
    historicalYearItemPressed?: (settings: SchoolYearSettings) => void;
    style?: ViewStyle;
}

const HistoricalYearsList = ({
    className,
    historicalYears,
    historicalYearItemPressed,
    style
}: HistoricalYearsListProps) => {
    return (
        <FlatList
            className={className}
            style={style}
            data={historicalYears}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <HistoricalYearListItem
                    key={item.id}
                    settings={item}
                    onPress={historicalYearItemPressed}
                />
            )}
        />
    )
}

export default HistoricalYearsList;
