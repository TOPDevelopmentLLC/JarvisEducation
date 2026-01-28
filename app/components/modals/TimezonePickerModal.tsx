import { View, Text, Pressable, ScrollView } from "react-native";
import { Modal } from "react-native-paper";


export interface TimezonePickerModalProps {
    isVisible: boolean;
    selectedTimezone: string;
    onTimezoneSelected: (timezone: string) => void;
    onDismiss: () => void;
}

interface TimezoneOption {
    value: string;
    label: string;
}

const TIMEZONE_OPTIONS: TimezoneOption[] = [
    { value: 'America/New_York', label: 'Eastern Time' },
    { value: 'America/Chicago', label: 'Central Time' },
    { value: 'America/Denver', label: 'Mountain Time' },
    { value: 'America/Los_Angeles', label: 'Pacific Time' },
    { value: 'America/Anchorage', label: 'Alaska Time' },
    { value: 'Pacific/Honolulu', label: 'Hawaii Time' },
    { value: 'America/Phoenix', label: 'Arizona (no DST)' },
    { value: 'America/Toronto', label: 'Eastern Canada' },
    { value: 'America/Vancouver', label: 'Pacific Canada' },
    { value: 'Europe/London', label: 'UK' },
    { value: 'Europe/Paris', label: 'Central Europe' },
    { value: 'Europe/Berlin', label: 'Germany' },
    { value: 'Asia/Tokyo', label: 'Japan' },
    { value: 'Asia/Shanghai', label: 'China' },
    { value: 'Australia/Sydney', label: 'Australia Eastern' },
];

const TimezonePickerModal = ({
    isVisible,
    selectedTimezone,
    onTimezoneSelected,
    onDismiss
}: TimezonePickerModalProps) => {
    return (
        <Modal
            visible={isVisible}
            onDismiss={onDismiss}
            contentContainerStyle={{
                backgroundColor: '#1f2937',
                borderRadius: 12,
                maxHeight: '60%',
                width: '60%',
                alignSelf: 'center'
            }}
        >
            <View className="p-4">
                <Text className="text-white text-lg font-bold mb-4">Select Timezone</Text>
                <ScrollView style={{ maxHeight: 400 }}>
                    {TIMEZONE_OPTIONS.map((option) => (
                        <Pressable
                            key={option.value}
                            onPress={() => {
                                onTimezoneSelected(option.value);
                                onDismiss();
                            }}
                            className={`p-3 rounded-lg mb-2 ${selectedTimezone === option.value ? 'bg-jarvisPrimary' : 'bg-gray-700'}`}
                        >
                            <Text className={selectedTimezone === option.value ? "text-black font-semibold" : "text-white"}>
                                {option.label}
                            </Text>
                            <Text className={selectedTimezone === option.value ? "text-black/70 text-sm" : "text-gray-400 text-sm"}>
                                {option.value}
                            </Text>
                        </Pressable>
                    ))}
                </ScrollView>
            </View>
        </Modal>
    );
}

export default TimezonePickerModal;
