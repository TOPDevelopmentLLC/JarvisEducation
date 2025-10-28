import MenuHeaderPage from "components/pages/MenuHeaderPage";
import { useState } from "react";
import AddCodeModal from "components/modals/AddCodeModal";
import EditCodeModal from "components/modals/EditCodeModal";
import ConfirmationModal from "components/modals/ConfirmationModal";
import { View, Text } from "react-native";
import { Code } from "lib/models/code";
import CodeList from "components/lists/CodeList";
import IconButton from "components/buttons/IconButton";
import { IconType } from "components/IconContainer";
import { useStoredCodeData } from "components/contexts/CodeContext";


const CodeSettings = () => {
    const { codes, deleteCode } = useStoredCodeData();
    const [addCodeModalIsVisible, setAddCodeModalIsVisible] = useState(false);
    const [editCodeModalIsVisible, setEditCodeModalIsVisible] = useState(false);
    const [confirmDeleteModalIsVisible, setConfirmDeleteModalIsVisible] = useState(false);
    const [codeToEdit, setCodeToEdit] = useState<Code | null>(null);
    const [codeToDelete, setCodeToDelete] = useState<Code | null>(null);

    const handleAddButtonPressed = () => {
        setAddCodeModalIsVisible(true);
    }

    const handleEditCode = (code: Code) => {
        setCodeToEdit(code);
        setEditCodeModalIsVisible(true);
    }

    const handleDeleteCode = (code: Code) => {
        setCodeToDelete(code);
        setConfirmDeleteModalIsVisible(true);
    }

    const confirmDelete = () => {
        if (codeToDelete) {
            deleteCode(codeToDelete.codeId);
        }
        setConfirmDeleteModalIsVisible(false);
        setCodeToDelete(null);
    }

    const cancelDelete = () => {
        setConfirmDeleteModalIsVisible(false);
        setCodeToDelete(null);
    }

    return (
        <MenuHeaderPage title="Codes">
            <View className="flex-1 px-6 pt-6 items-center">
                <View className="w-[60%] flex-1">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-white text-2xl font-bold">Emergency Codes</Text>
                        <IconButton 
                            className="bg-jarvisPrimary"
                            iconProps={{
                                name: 'plus',
                                color: '#000000',
                                size: 24,
                                type: IconType.MaterialCommunityIcons
                            }} 
                            onIconClicked={handleAddButtonPressed} 
                        />
                    </View>

                    {codes.length > 0 ? (
                        <CodeList
                            codes={codes}
                            editButtonPressed={handleEditCode}
                            deleteButtonPressed={handleDeleteCode}
                        />
                    ) : (
                        <View className="flex-1 justify-center items-center">
                            <Text className="text-gray-400 text-base">No codes available</Text>
                        </View>
                    )}
                </View>
            </View>

            <AddCodeModal
                isVisible={addCodeModalIsVisible}
                onDismiss={() => setAddCodeModalIsVisible(false)}
            />

            <EditCodeModal
                isVisible={editCodeModalIsVisible}
                onDismiss={() => {
                    setEditCodeModalIsVisible(false);
                    setCodeToEdit(null);
                }}
                code={codeToEdit}
            />

            <ConfirmationModal
                isVisible={confirmDeleteModalIsVisible}
                title="Delete Code"
                message={`Are you sure you want to delete ${codeToDelete?.name}?`}
                confirmText="Delete"
                cancelText="Cancel"
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
            />
        </MenuHeaderPage>
    )
}

export default CodeSettings;
