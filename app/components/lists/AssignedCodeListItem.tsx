import { View, Text } from "react-native";
import { Code } from "lib/models/code";
import DeleteButton from "components/buttons/DeleteButton";

export interface AssignedCodeListItemProps {
    code: Code;
    showDeleteButton?: boolean;
    onDelete?: (code: Code) => void;
}

const AssignedCodeListItem = ({
    code,
    showDeleteButton = false,
    onDelete
}: AssignedCodeListItemProps) => {
    return (
        <View className="flex-row items-center justify-between mb-2">
            <Text className="text-white text-base flex-1">
                • {code.name} - {code.description}
            </Text>
            {showDeleteButton && onDelete && (
                <DeleteButton
                    onIconClicked={() => onDelete(code)}
                />
            )}
        </View>
    );
};

export default AssignedCodeListItem;
