import { View, Text } from "react-native";
import { Team } from "lib/models/team";

export interface AssignedTeamListItemProps {
    team: Team;
}

const AssignedTeamListItem = ({
    team
}: AssignedTeamListItemProps) => {
    return (
        <View className="mb-2">
            <Text className="text-white text-base">
                • {team.name}
            </Text>
        </View>
    );
};

export default AssignedTeamListItem;
