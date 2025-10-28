import { View, Text, Dimensions } from "react-native";
import JarvisModal from "./JarvisModal";
import { IconType } from "components/IconContainer";
import { useState, useEffect } from "react";
import CodeList from "components/lists/CodeList";
import { useStoredCodeData } from "components/contexts/CodeContext";
import { useStoredAdminData } from "components/contexts/AdminContext";
import { useSuccessSnackbar } from "components/contexts/SnackbarContext";
import { Administrator } from "lib/models/administrator";
import { Code } from "lib/models/code";


export interface AssignCodeModalProps {
    isVisible: boolean;
    onDismiss?: () => void;
    admin: Administrator | null;
}

const AssignCodeModal = ({
    isVisible,
    onDismiss,
    admin,
}: AssignCodeModalProps) => {
    const [selectedCodeIds, setSelectedCodeIds] = useState<string[]>([]);
    const { codes } = useStoredCodeData();
    const { assignCodesToAdmin } = useStoredAdminData();
    const showSuccessMessage = useSuccessSnackbar();
    const windowHeight = Dimensions.get('window').height;

    // Initialize with admin's current codes when modal opens
    useEffect(() => {
        if (admin) {
            setSelectedCodeIds(admin.assignedCodeIds || []);
        }
    }, [admin, isVisible]);

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
        if (!admin) {
            return;
        }

        assignCodesToAdmin(admin.adminId, selectedCodeIds);
        showSuccessMessage(`Codes assigned to ${admin.name}`);

        onDismiss?.();
    };

    return (
        <JarvisModal
            headerProps={{
                title: admin ? `Assign Codes to ${admin.name}` : 'Assign Codes',
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

export default AssignCodeModal;
