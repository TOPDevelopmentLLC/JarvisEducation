import { useErrorSnackbar } from "components/contexts/SnackbarContext";
import { useStoredTeamData } from "components/contexts/TeamContext";
import { IconType } from "components/IconContainer";
import JarvisPaperTextInput from "components/JarvisPaperTextInput";
import JarvisModal from "components/modals/JarvisModal";
import { useState } from "react";


export interface AddTeamModalProps {
    isVisible: boolean;
    onDismiss?: () => void;
}

const AddTeamModal = ({
    isVisible,
    onDismiss
}: AddTeamModalProps) => {
    const [teamName, setTeamName] = useState('');
    const [teamDescription, setTeamDescription] = useState('');
    const showErrorMessage = useErrorSnackbar();
    const { addTeam, teams } = useStoredTeamData();

    const addButtonPressed = () => {
        if (teamName.length === 0) {
            showErrorMessage("Please enter the Team name");
            return;
        }
        if (teamDescription.length === 0) {
            showErrorMessage('Please enter a description for the Team.');
            return;
        }

        // Generate new ID and add team
        const newId = (teams.length + 1).toString();
        addTeam({
            teamId: newId,
            name: teamName,
            description: teamDescription,
            memberIds: [],
            assignedCodeIds: []
        });

        // Reset form and close modal
        setTeamName('');
        setTeamDescription('');
        onDismiss?.();
    }

    return (
        <JarvisModal
            headerProps={{
                title: 'Add Team',
                icon: {
                    type: IconType.MaterialCommunityIcons,
                    name: 'account-group',
                    color: '#000000',
                    size: 32
                }
            }}
            isVisible={isVisible}
            onDismiss={onDismiss}
            confirmButtonProps={{
                title: "Add",
                onPress: addButtonPressed
            }}>
                <JarvisPaperTextInput
                    placeholder={"Team Name"}
                    onTextChange={(name) => setTeamName(name)}
                />
                <JarvisPaperTextInput
                    placeholder={"Team Description"}
                    onTextChange={(description) => setTeamDescription(description)}
                    style={{
                        marginTop: 8
                    }}
                    multiline
                    numberOfLines={3}
                />
        </JarvisModal>
    )
}

export default AddTeamModal;
