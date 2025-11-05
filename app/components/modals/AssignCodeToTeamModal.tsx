import { View, Text, Dimensions } from "react-native";
import JarvisModal from "./JarvisModal";
import { IconType } from "components/IconContainer";
import { useState, useEffect } from "react";
import CodeList from "components/lists/CodeList";
import { useStoredCodeData } from "components/contexts/CodeContext";
import { useStoredTeamData } from "components/contexts/TeamContext";
import { useSuccessSnackbar } from "components/contexts/SnackbarContext";
import { Team } from "lib/models/team";
import { Code } from "lib/models/code";


export interface AssignCodeToTeamModalProps {
    isVisible: boolean;
    onDismiss?: () => void;
    team: Team | null;
}

const AssignCodeToTeamModal = ({
    isVisible,
    onDismiss,
    team,
}: AssignCodeToTeamModalProps) => {
    const [selectedCodeIds, setSelectedCodeIds] = useState<string[]>([]);
    const { codes } = useStoredCodeData();
    const { assignCodesToTeam } = useStoredTeamData();
    const showSuccessMessage = useSuccessSnackbar();
    const windowHeight = Dimensions.get('window').height;

    // Initialize with team's current codes when modal opens
    useEffect(() => {
        if (team) {
            setSelectedCodeIds(team.assignedCodeIds || []);
        }
    }, [team, isVisible]);

    const handleCodePressed = (code: Code) => {
        setSelectedCodeIds(prev => {
            if (prev.includes(code.codeId)) {
                // Deselect
                return prev.filter(id => id !== code.codeId);
            } else {
                // Select
                return [...prev, code.codeId];
            }
        });
    };

    const handleAssignCodes = () => {
        if (!team) {
            return;
        }

        assignCodesToTeam(team.teamId, selectedCodeIds);
        showSuccessMessage(`Codes assigned to ${team.name}`);

        onDismiss?.();
    };

    return (
        <JarvisModal
            headerProps={{
                title: team ? `Assign Codes to ${team.name}` : 'Assign Codes',
                icon: {
                    type: IconType.MaterialCommunityIcons,
                    name: 'shield-account',
                    color: '#000000',
                    size: 32
                }
            }}
            isVisible={isVisible}
            onDismiss={onDismiss}
            confirmButtonProps={{
                title: "Assign",
                onPress: handleAssignCodes
            }}>
            <View className="items-center">
                <Text className="text-white text-base mb-3">
                    Select codes to assign (multiple selection):
                </Text>
                <CodeList
                    className="w-[100%]"
                    codes={codes}
                    selectedCodeIds={selectedCodeIds}
                    codeItemPressed={handleCodePressed}
                    style={{
                        maxHeight: windowHeight * 0.5
                    }}
                />
            </View>
        </JarvisModal>
    );
};

export default AssignCodeToTeamModal;
