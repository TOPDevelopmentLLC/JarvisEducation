import { View, Text } from "react-native";
import { Team } from "lib/models/team";
import AssignedTeamListItem from "./AssignedTeamListItem";

export interface AssignedTeamListProps {
    teams: Team[];
    emptyText?: string;
}

const AssignedTeamList = ({
    teams,
    emptyText = "None"
}: AssignedTeamListProps) => {
    if (teams.length === 0) {
        return <Text className="text-white text-base">{emptyText}</Text>;
    }

    return (
        <View>
            {teams.map((team) => (
                <AssignedTeamListItem
                    key={team.teamId}
                    team={team}
                />
            ))}
        </View>
    );
};

export default AssignedTeamList;
