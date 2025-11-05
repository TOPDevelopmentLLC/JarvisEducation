import { Pressable, Text, View } from "react-native";
import { Team } from "lib/models/team";
import clsx from "clsx";
import EditButton from "components/buttons/EditButton";
import DeleteButton from "components/buttons/DeleteButton";


export interface TeamListItemProps {
    className?: string;
    team: Team;
    onEdit?: (team: Team) => void;
    onDelete?: (team: Team) => void;
    onPress?: (team: Team) => void;
}

const TeamListItem = ({
    className,
    team,
    onEdit,
    onDelete,
    onPress
}: TeamListItemProps) => {
    return (
        <Pressable
            className={clsx("flex-row items-center bg-gray-800 rounded-xl p-4 mb-3 justify-between active:opacity-80", className)}
            onPress={() => onPress?.(team)}>
            <View className="flex-1">
                <Text className="text-white text-lg font-semibold">{team.name}</Text>
                <Text className="text-gray-400 text-sm mt-1">{team.description}</Text>
                <Text className="text-gray-500 text-xs mt-1">
                    {team.memberIds.length} {team.memberIds.length === 1 ? 'member' : 'members'}
                </Text>
            </View>

            <View className="flex-row gap-2 ml-3">
                {onEdit && (
                    <EditButton
                        onIconClicked={(e) => {
                            e.stopPropagation();
                            onEdit(team);
                        }}
                    />
                )}
                {onDelete && (
                    <DeleteButton
                        onIconClicked={(e) => {
                            e.stopPropagation();
                            onDelete(team);
                        }}
                    />
                )}
            </View>
        </Pressable>
    )
}

export default TeamListItem;
