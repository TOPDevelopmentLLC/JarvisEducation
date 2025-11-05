import { useStoredTeamData } from "components/contexts/TeamContext";
import { useStoredTeacherData } from "components/contexts/TeacherContext";
import { useStoredAdminData } from "components/contexts/AdminContext";
import { useStoredCodeData } from "components/contexts/CodeContext";
import DetailsHeaderPage from "components/pages/DetailsHeaderPage";
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, useWindowDimensions } from "react-native";
import AssignMembersModal from "components/modals/AssignMembersModal";
import AssignCodeToTeamModal from "components/modals/AssignCodeToTeamModal";
import BaseButton from "components/buttons/BaseButton";
import IconContainer, { IconType } from "components/IconContainer";
import TeamMemberList from "components/lists/TeamMemberList";
import { TeamMember } from "components/lists/TeamMemberListItem";


const TeamDetailsPage = () => {
    const { selectedTeam, setSelectedTeam, updateTeam, removeMemberFromTeam } = useStoredTeamData();
    const { teachers } = useStoredTeacherData();
    const { admins } = useStoredAdminData();
    const { codes } = useStoredCodeData();
    const { edit } = useLocalSearchParams();
    const [inEditMode, setEditMode] = useState<boolean>(edit === '1');
    const [currentTeamName, setCurrentTeamName] = useState(selectedTeam?.name || '');
    const [currentTeamDescription, setCurrentTeamDescription] = useState(selectedTeam?.description || '');
    const [assignMembersModalIsVisible, setAssignMembersModalIsVisible] = useState(false);
    const [assignCodesModalIsVisible, setAssignCodesModalIsVisible] = useState(false);
    const { height } = useWindowDimensions();

    const maxListHeight = height * 0.25;

    // Get members (teachers and admins) by parsing the uniqueId format
    const teamMembers: TeamMember[] = [
        ...teachers.filter(t => selectedTeam?.memberIds.includes(`teacher:${t.teacherId}`)).map(t => ({
            id: t.teacherId,
            name: t.name,
            type: 'teacher' as const
        })),
        ...admins.filter(a => selectedTeam?.memberIds.includes(`admin:${a.adminId}`)).map(a => ({
            id: a.adminId,
            name: a.name,
            type: 'admin' as const
        }))
    ];

    // Get assigned codes
    const assignedCodes = codes.filter(c => selectedTeam?.assignedCodeIds.includes(c.codeId));

    // Update local state when selectedTeam changes
    useEffect(() => {
        if (selectedTeam) {
            setCurrentTeamName(selectedTeam.name);
            setCurrentTeamDescription(selectedTeam.description);
        }
    }, [selectedTeam]);

    const saveButtonPressed = () => {
        if (!selectedTeam) return;

        updateTeam({
            ...selectedTeam,
            name: currentTeamName,
            description: currentTeamDescription
        });
        setEditMode(false);
    };

    const editButtonPressed = () => {
        setEditMode(true);
    };

    const cancelButtonPressed = () => {
        if (!selectedTeam) return;
        setEditMode(false);
        setCurrentTeamName(selectedTeam.name);
        setCurrentTeamDescription(selectedTeam.description);
    };

    const handleRemoveMember = (memberId: string, memberType: 'teacher' | 'admin') => {
        if (!selectedTeam) return;
        const uniqueId = `${memberType}:${memberId}`;
        removeMemberFromTeam(selectedTeam.teamId, uniqueId);
    };

    if (!selectedTeam) {
        return null;
    }

    return (
        <DetailsHeaderPage
            title="Team Details"
            backButtonAction={() => setSelectedTeam(null)}
        >
            <ScrollView className="flex-1 px-6 pt-6">
                <View className="max-w-2xl w-full mx-auto">
                    {/* Header Card */}
                    <View className="bg-gray-800 rounded-xl p-6 mb-6">
                        <View className="flex-row items-center mb-4">
                            <View className="bg-jarvisPrimary rounded-full p-3 mr-4">
                                <IconContainer
                                    iconProps={{
                                        name: 'account-group',
                                        size: 32,
                                        color: '#000',
                                        type: IconType.MaterialCommunityIcons
                                    }}
                                />
                            </View>
                            <View className="flex-1">
                                <Text className="text-gray-400 text-sm">Team</Text>
                                <Text className="text-white text-2xl font-bold">{selectedTeam.name}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Information Card */}
                    <View className="bg-gray-800 rounded-xl p-6 mb-6">
                        <View className="flex-row items-center justify-between mb-6">
                            <Text className="text-white text-xl font-bold">Team Information</Text>
                            {!inEditMode && (
                                <BaseButton
                                    title="Edit"
                                    className="bg-jarvisPrimary rounded-lg px-6 py-2 active:opacity-70"
                                    textClassName="text-black text-sm font-semibold"
                                    onPress={editButtonPressed}
                                />
                            )}
                        </View>

                        {/* Name Field */}
                        <View className="mb-6">
                            <Text className="text-gray-400 text-sm mb-2">Team Name</Text>
                            {inEditMode ? (
                                <TextInput
                                    className="bg-gray-700 text-white rounded-lg px-4 py-3 text-base"
                                    value={currentTeamName}
                                    onChangeText={setCurrentTeamName}
                                    placeholderTextColor="#9CA3AF"
                                />
                            ) : (
                                <View className="px-4 py-3">
                                    <Text className="text-white text-base">{currentTeamName}</Text>
                                </View>
                            )}
                        </View>

                        {/* Description Field */}
                        <View className="mb-6">
                            <Text className="text-gray-400 text-sm mb-2">Description</Text>
                            {inEditMode ? (
                                <TextInput
                                    className="bg-gray-700 text-white rounded-lg px-4 py-3 text-base"
                                    value={currentTeamDescription}
                                    onChangeText={setCurrentTeamDescription}
                                    placeholderTextColor="#9CA3AF"
                                    multiline
                                    numberOfLines={4}
                                    textAlignVertical="top"
                                />
                            ) : (
                                <View className="px-4 py-3">
                                    <Text className="text-white text-base">{currentTeamDescription}</Text>
                                </View>
                            )}
                        </View>

                        {/* Edit Mode Action Buttons */}
                        {inEditMode && (
                            <View className="gap-3">
                                <BaseButton
                                    title="Save Changes"
                                    className="bg-jarvisPrimary rounded-lg items-center active:opacity-70"
                                    textClassName="text-black text-base font-semibold"
                                    onPress={saveButtonPressed}
                                />
                                <BaseButton
                                    title="Cancel"
                                    className="bg-gray-700 rounded-lg items-center active:opacity-70"
                                    textClassName="text-white text-base font-semibold"
                                    onPress={cancelButtonPressed}
                                />
                            </View>
                        )}
                    </View>

                    {/* Members Section */}
                    <View className="bg-gray-800 rounded-xl p-6 mb-6">
                        <View className="flex-row items-center justify-between mb-4">
                            <Text className="text-white text-xl font-bold">Members ({teamMembers.length})</Text>
                            <BaseButton
                                title="Assign Members"
                                className="bg-jarvisPrimary rounded-lg px-6 py-2 active:opacity-70"
                                textClassName="text-black text-sm font-semibold"
                                onPress={() => setAssignMembersModalIsVisible(true)}
                            />
                        </View>
                        <TeamMemberList
                            members={teamMembers}
                            onDeleteMember={handleRemoveMember}
                            style={{ maxHeight: maxListHeight }}
                        />
                    </View>

                    {/* Assigned Codes Section */}
                    <View className="bg-gray-800 rounded-xl p-6 mb-6">
                        <View className="flex-row items-center justify-between mb-4">
                            <Text className="text-white text-xl font-bold">Assigned Codes ({assignedCodes.length})</Text>
                            <BaseButton
                                title="Assign Codes"
                                className="bg-jarvisPrimary rounded-lg px-6 py-2 active:opacity-70"
                                textClassName="text-black text-sm font-semibold"
                                onPress={() => setAssignCodesModalIsVisible(true)}
                            />
                        </View>
                        <ScrollView style={{ maxHeight: maxListHeight }} showsVerticalScrollIndicator={true}>
                            {assignedCodes.length > 0 ? (
                                assignedCodes.map((code) => (
                                    <View key={code.codeId} className="bg-gray-700 rounded-xl p-4 mb-3">
                                        <View className="flex-row items-center mb-2">
                                            <View className="bg-jarvisPrimary rounded-full px-3 py-1 mr-2">
                                                <Text className="text-black font-bold">{code.name}</Text>
                                            </View>
                                        </View>
                                        <Text className="text-gray-400 text-sm">{code.description}</Text>
                                    </View>
                                ))
                            ) : (
                                <Text className="text-gray-400 text-center py-8">No codes assigned</Text>
                            )}
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
            <AssignMembersModal
                isVisible={assignMembersModalIsVisible}
                onDismiss={() => setAssignMembersModalIsVisible(false)}
                team={selectedTeam}
            />
            <AssignCodeToTeamModal
                isVisible={assignCodesModalIsVisible}
                onDismiss={() => setAssignCodesModalIsVisible(false)}
                team={selectedTeam}
            />
        </DetailsHeaderPage>
    );
};

export default TeamDetailsPage;
