import { Team } from "lib/models/team";
import TeamListItem from "components/lists/TeamListItem";
import { ScrollView } from "react-native";
import NoDataView, { DataType } from "components/NoDataView";


export interface TeamListProps {
    className?: string;
    teams: Team[];
    currentSearchText: string;
    editButtonPressed: (team: Team) => void;
    deleteButtonPressed: (team: Team) => void;
    teamItemPressed: (team: Team) => void;
}

const TeamList = ({
    className,
    teams,
    currentSearchText,
    editButtonPressed,
    deleteButtonPressed,
    teamItemPressed,
}: TeamListProps) => {
    return (
        <ScrollView
            className={className}
            showsVerticalScrollIndicator={false}>
                {teams.length > 0 ? (
                    teams.map((team) => (
                        <TeamListItem
                            key={team.teamId}
                            team={team}
                            onEdit={editButtonPressed}
                            onDelete={deleteButtonPressed}
                            onPress={teamItemPressed}
                        />
                    ))
                ) : (
                    <NoDataView
                        className="flex-1 py-20"
                        dataType={DataType.TEAM}
                        currentSearchText={currentSearchText}
                    />
                )
            }
        </ScrollView>
    )
}

export default TeamList;
