import { View, Text } from "react-native";
import { Code } from "lib/models/code";
import AssignedCodeListItem from "./AssignedCodeListItem";

export interface AssignedCodeListProps {
    codes: Code[];
    showDeleteButtons?: boolean;
    onDeleteCode?: (code: Code) => void;
    emptyText?: string;
}

const AssignedCodeList = ({
    codes,
    showDeleteButtons = false,
    onDeleteCode,
    emptyText = "None"
}: AssignedCodeListProps) => {
    if (codes.length === 0) {
        return <Text className="text-white text-base">{emptyText}</Text>;
    }

    return (
        <View>
            {codes.map((code) => (
                <AssignedCodeListItem
                    key={code.codeId}
                    code={code}
                    showDeleteButton={showDeleteButtons}
                    onDelete={onDeleteCode}
                />
            ))}
        </View>
    );
};

export default AssignedCodeList;
