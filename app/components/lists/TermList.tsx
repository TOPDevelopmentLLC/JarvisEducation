import { FlatList, ViewStyle } from "react-native";
import { Term } from "lib/models/schoolYearSettings";
import TermListItem from "./TermListItem";


export interface TermListProps {
    className?: string;
    terms: Term[];
    deleteButtonPressed?: (term: Term) => void;
    termItemPressed?: (term: Term) => void;
    style?: ViewStyle;
}

const TermList = ({
    className,
    terms,
    deleteButtonPressed,
    termItemPressed,
    style
}: TermListProps) => {
    return (
        <FlatList
            className={className}
            style={style}
            data={terms}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <TermListItem
                    key={item.id}
                    term={item}
                    onDelete={deleteButtonPressed}
                    onPress={termItemPressed}
                />
            )}
        />
    )
}

export default TermList;
