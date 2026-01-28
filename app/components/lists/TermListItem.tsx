import { Pressable, Text, View } from "react-native";
import { Term } from "lib/models/schoolYearSettings";
import clsx from "clsx";
import DeleteButton from "components/buttons/DeleteButton";


export interface TermListItemProps {
    className?: string;
    term: Term;
    onDelete?: (term: Term) => void;
    onPress?: (term: Term) => void;
}

const TermListItem = ({
    className,
    term,
    onDelete,
    onPress
}: TermListItemProps) => {
    return (
        <Pressable
            className={clsx(
                "flex-row items-center rounded-xl p-4 mb-3 justify-between active:opacity-80 bg-gray-800",
                className
            )}
            onPress={() => onPress?.(term)}>
            <View className="flex-1">
                <Text className="text-white text-lg font-semibold">
                    {term.name}
                </Text>
                <Text className="text-gray-400 text-sm mt-1">
                    {term.startDate} - {term.endDate}
                </Text>
            </View>

            <View className="flex-row gap-2">
                {onDelete && (
                    <DeleteButton
                        onIconClicked={(e) => {
                            e.stopPropagation();
                            onDelete(term);
                        }}
                    />
                )}
            </View>
        </Pressable>
    )
}

export default TermListItem;
