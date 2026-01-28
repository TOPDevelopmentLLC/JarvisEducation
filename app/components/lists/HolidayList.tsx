import { FlatList, ViewStyle } from "react-native";
import { Holiday } from "lib/models/schoolYearSettings";
import HolidayListItem from "./HolidayListItem";


export interface HolidayListProps {
    className?: string;
    holidays: Holiday[];
    deleteButtonPressed?: (holiday: Holiday) => void;
    holidayItemPressed?: (holiday: Holiday) => void;
    style?: ViewStyle;
}

const HolidayList = ({
    className,
    holidays,
    deleteButtonPressed,
    holidayItemPressed,
    style
}: HolidayListProps) => {
    return (
        <FlatList
            className={className}
            style={style}
            data={holidays}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <HolidayListItem
                    key={item.id}
                    holiday={item}
                    onDelete={deleteButtonPressed}
                    onPress={holidayItemPressed}
                />
            )}
        />
    )
}

export default HolidayList;
