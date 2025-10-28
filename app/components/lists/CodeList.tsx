import { FlatList, ViewStyle } from "react-native";
import { Code } from "lib/models/code";
import CodeListItem from "./CodeListItem";


export interface CodeListProps {
    className?: string;
    codes: Code[];
    editButtonPressed?: (code: Code) => void;
    deleteButtonPressed?: (code: Code) => void;
    codeItemPressed?: (code: Code) => void;
    style?: ViewStyle;
}

const CodeList = ({
    className,
    codes,
    editButtonPressed,
    deleteButtonPressed,
    codeItemPressed,
    style
}: CodeListProps) => {
    return (
        <FlatList
            className={className}
            style={style}
            data={codes}
            keyExtractor={(item) => item.codeId}
            renderItem={({item}) => (
                <CodeListItem
                    key={item.codeId}
                    code={item}
                    onEdit={editButtonPressed}
                    onDelete={deleteButtonPressed}
                    onPress={codeItemPressed}
                />
            )}
        />
    )
}

export default CodeList;
