import { View, Text, Dimensions, FlatList, Pressable } from "react-native";
import JarvisModal from "./JarvisModal";
import { IconType } from "components/IconContainer";
import { useState, useEffect } from "react";
import { useStoredTeacherData } from "components/contexts/TeacherContext";
import { useStoredAdminData } from "components/contexts/AdminContext";
import { useStoredTeamData } from "components/contexts/TeamContext";
import { useSuccessSnackbar } from "components/contexts/SnackbarContext";
import { Team } from "lib/models/team";
import IconContainer from "components/IconContainer";
import clsx from "clsx";


export interface AssignMembersModalProps {
    isVisible: boolean;
    onDismiss?: () => void;
    team: Team | null;
}

interface Member {
    id: string;
    uniqueId: string; // Format: "teacher:{id}" or "admin:{id}"
    name: string;
    type: 'teacher' | 'admin';
}

const AssignMembersModal = ({
    isVisible,
    onDismiss,
    team,
}: AssignMembersModalProps) => {
    const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);
    const { teachers } = useStoredTeacherData();
    const { admins } = useStoredAdminData();
    const { updateTeam } = useStoredTeamData();
    const showSuccessMessage = useSuccessSnackbar();
    const windowHeight = Dimensions.get('window').height;

    // Combine teachers and admins into a single list with unique IDs
    const allMembers: Member[] = [
        ...teachers.map(t => ({
            id: t.teacherId,
            uniqueId: `teacher:${t.teacherId}`,
            name: t.name,
            type: 'teacher' as const
        })),
        ...admins.map(a => ({
            id: a.adminId,
            uniqueId: `admin:${a.adminId}`,
            name: a.name,
            type: 'admin' as const
        }))
    ];

    // Initialize with team's current members when modal opens
    useEffect(() => {
        if (team) {
            setSelectedMemberIds(team.memberIds || []);
        }
    }, [team, isVisible]);

    const handleMemberPressed = (member: Member) => {
        setSelectedMemberIds(prev => {
            if (prev.includes(member.uniqueId)) {
                // Deselect
                return prev.filter(id => id !== member.uniqueId);
            } else {
                // Select
                return [...prev, member.uniqueId];
            }
        });
    };

    const handleAssignMembers = () => {
        if (!team) {
            return;
        }

        updateTeam({
            ...team,
            memberIds: selectedMemberIds
        });
        showSuccessMessage(`Members assigned to ${team.name}`);

        onDismiss?.();
    };

    const renderMemberItem = ({ item }: { item: Member }) => {
        const isSelected = selectedMemberIds.includes(item.uniqueId);

        return (
            <Pressable
                className={clsx(
                    "flex-row items-center rounded-xl p-4 mb-2 justify-between active:opacity-80",
                    isSelected ? "bg-jarvisPrimary" : "bg-gray-800"
                )}
                onPress={() => handleMemberPressed(item)}>
                <View className="flex-1">
                    <Text className={clsx("text-lg font-semibold", isSelected ? "text-black" : "text-white")}>
                        {item.name}
                    </Text>
                    <Text className={clsx("text-sm mt-1", isSelected ? "text-gray-800" : "text-gray-400")}>
                        {item.type === 'teacher' ? 'Teacher' : 'Administrator'}
                    </Text>
                </View>

                {isSelected && (
                    <IconContainer
                        iconProps={{
                            name: 'check-circle',
                            size: 24,
                            color: '#000',
                            type: IconType.MaterialCommunityIcons
                        }}
                    />
                )}
            </Pressable>
        );
    };

    return (
        <JarvisModal
            headerProps={{
                title: team ? `Assign Members to ${team.name}` : 'Assign Members',
                icon: {
                    type: IconType.MaterialCommunityIcons,
                    name: 'account-multiple',
                    color: '#000000',
                    size: 32
                }
            }}
            isVisible={isVisible}
            onDismiss={onDismiss}
            confirmButtonProps={{
                title: "Assign",
                onPress: handleAssignMembers
            }}>
            <View className="items-center">
                <Text className="text-white text-base mb-3">
                    Select members to assign (multiple selection):
                </Text>
                <FlatList
                    className="w-[100%]"
                    style={{ maxHeight: windowHeight * 0.5 }}
                    data={allMembers}
                    keyExtractor={(item) => item.uniqueId}
                    renderItem={renderMemberItem}
                    showsVerticalScrollIndicator={true}
                />
            </View>
        </JarvisModal>
    );
};

export default AssignMembersModal;
