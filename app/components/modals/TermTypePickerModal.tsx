import { View, Text, Pressable } from "react-native";
import { Modal } from "react-native-paper";


export interface TermTypePickerModalProps {
    isVisible: boolean;
    selectedTermType: string;
    onTermTypeSelected: (termType: string) => void;
    onDismiss: () => void;
}

interface TermTypeOption {
    value: string;
    label: string;
    description: string;
}

const TERM_TYPE_OPTIONS: TermTypeOption[] = [
    { value: 'Semester', label: 'Semester', description: 'Two terms per year (Fall/Spring)' },
    { value: 'Trimester', label: 'Trimester', description: 'Three terms per year' },
    { value: 'Quarter', label: 'Quarter', description: 'Four terms per year' },
];

const TermTypePickerModal = ({
    isVisible,
    selectedTermType,
    onTermTypeSelected,
    onDismiss
}: TermTypePickerModalProps) => {
    return (
        <Modal
            visible={isVisible}
            onDismiss={onDismiss}
            contentContainerStyle={{
                backgroundColor: '#1f2937',
                borderRadius: 12,
                width: '60%',
                alignSelf: 'center'
            }}
        >
            <View className="p-4">
                <Text className="text-white text-lg font-bold mb-4">Select Term Type</Text>
                {TERM_TYPE_OPTIONS.map((option) => (
                    <Pressable
                        key={option.value}
                        onPress={() => {
                            onTermTypeSelected(option.value);
                            onDismiss();
                        }}
                        className={`p-3 rounded-lg mb-2 ${selectedTermType === option.value ? 'bg-jarvisPrimary' : 'bg-gray-700'}`}
                    >
                        <Text className={selectedTermType === option.value ? "text-black font-semibold" : "text-white"}>
                            {option.label}
                        </Text>
                        <Text className={selectedTermType === option.value ? "text-black/70 text-sm" : "text-gray-400 text-sm"}>
                            {option.description}
                        </Text>
                    </Pressable>
                ))}
            </View>
        </Modal>
    );
}

export default TermTypePickerModal;
