import MenuHeaderPage from "components/pages/MenuHeaderPage";
import { router } from 'expo-router';
import AddTeamModal from "components/modals/AddTeamModal";
import ConfirmationModal from "components/modals/ConfirmationModal";
import { useState } from "react";
import { View, Text } from "react-native";
import { Team } from "lib/models/team";
import TeamList from "components/lists/TeamList";
import SearchBar from "components/SearchBar";
import IconButton from "components/buttons/IconButton";
import { IconType } from "components/IconContainer";
import { useStoredTeamData } from "components/contexts/TeamContext";


const TeamListPage = () => {
    const { teams, setSelectedTeam, deleteTeam } = useStoredTeamData();
    const [addTeamModalIsVisible, setAddTeamModalIsVisible] = useState(false);
    const [confirmDeleteModalIsVisible, setConfirmDeleteModalIsVisible] = useState(false);
    const [teamToDelete, setTeamToDelete] = useState<Team | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredTeams = teams.filter(team =>
        team.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddButtonPressed = () => {
        setAddTeamModalIsVisible(true);
    }

    const handleEditTeam = (team: Team) => {
        setSelectedTeam(team);
        router.push({
            pathname: '/pages/teams/TeamDetailsPage',
            params: {
                edit: 1
            }
        });
    }

    const handleDeleteTeam = (team: Team) => {
        setTeamToDelete(team);
        setConfirmDeleteModalIsVisible(true);
    }

    const confirmDelete = () => {
        if (teamToDelete) {
            deleteTeam(teamToDelete.teamId);
        }
        setConfirmDeleteModalIsVisible(false);
        setTeamToDelete(null);
    }

    const cancelDelete = () => {
        setConfirmDeleteModalIsVisible(false);
        setTeamToDelete(null);
    }

    const handleViewTeam = (team: Team) => {
        setSelectedTeam(team);
        router.push({
            pathname: '/pages/teams/TeamDetailsPage',
            params: {
                edit: 0
            }
        });
    }

    return (
        <MenuHeaderPage title="Teams">
            <View className="flex-1">
                <View className="w-[60%] mx-auto px-6 pt-4 flex-1">
                {/* Header Section with Search and Add Button */}
                <View className="mb-4">
                    <View className="flex-row items-center gap-3 mb-4">
                        <SearchBar
                            className="flex-1 px-4 py-3"
                            placeholder={"Search teams..."}
                            value={searchQuery}
                            onValueChanged={setSearchQuery}
                        />
                        <IconButton
                            className="bg-jarvisPrimary"
                            iconProps={{
                                name: 'plus',
                                size: 24,
                                color: '#000000',
                                type: IconType.MaterialCommunityIcons
                            }}
                            onIconClicked={handleAddButtonPressed}
                        />
                    </View>

                    <Text className="text-gray-400 text-sm">
                        {filteredTeams.length} {filteredTeams.length === 1 ? 'team' : 'teams'} found
                    </Text>
                </View>
                <TeamList
                    className="flex-1"
                    teams={filteredTeams}
                    currentSearchText={"Search teams..."}
                    editButtonPressed={handleEditTeam}
                    deleteButtonPressed={handleDeleteTeam}
                    teamItemPressed={handleViewTeam}
                />
                <AddTeamModal
                    isVisible={addTeamModalIsVisible}
                    onDismiss={() => setAddTeamModalIsVisible(false)}
                />
                <ConfirmationModal
                    isVisible={confirmDeleteModalIsVisible}
                    title="Delete Team"
                    message={`Are you sure you want to delete ${teamToDelete?.name}? This action cannot be undone.`}
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
                </View>
            </View>
        </MenuHeaderPage>
    )
}

export default TeamListPage;
