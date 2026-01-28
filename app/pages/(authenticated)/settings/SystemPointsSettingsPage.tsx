import MenuHeaderPage from "components/pages/MenuHeaderPage";
import { useState, useEffect } from "react";
import { View, Text, ScrollView, ActivityIndicator, Pressable, TextInput } from "react-native";
import { useProfile } from "components/contexts/ProfileContext";
import { useErrorSnackbar, useSuccessSnackbar } from "components/contexts/SnackbarContext";
import { pointsSystemService } from "lib/services/pointsSystemService";
import { PointsSystem } from "lib/models/pointsSystem";
import IconButton from "components/buttons/IconButton";
import { IconType } from "components/IconContainer";

const SystemPointsSettingsPage = () => {
    const { profile } = useProfile();
    const showErrorMessage = useErrorSnackbar();
    const showSuccessMessage = useSuccessSnackbar();

    const [pointsSystem, setPointsSystem] = useState<PointsSystem | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Inline editing states
    const [isEditing, setIsEditing] = useState(false);
    const [editAttendanceDeduction, setEditAttendanceDeduction] = useState('');
    const [editBehaviorDeduction, setEditBehaviorDeduction] = useState('');
    const [editConflictDeduction, setEditConflictDeduction] = useState('');
    const [editExpelledDeduction, setEditExpelledDeduction] = useState('');
    const [editMoodDeduction, setEditMoodDeduction] = useState('');
    const [editSecludedDeduction, setEditSecludedDeduction] = useState('');
    const [editSipDeduction, setEditSipDeduction] = useState('');
    const [editDailyIncrease, setEditDailyIncrease] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetchPointsSystem();
    }, []);

    const fetchPointsSystem = async () => {
        if (!profile?.token) {
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            const response = await pointsSystemService.getPointsSystem(profile.token);
            setPointsSystem(response.pointsSystem);
        } catch (error) {
            showErrorMessage(error instanceof Error ? error.message : 'Failed to fetch points system');
        } finally {
            setIsLoading(false);
        }
    };

    const startEditing = () => {
        if (!pointsSystem) return;
        setEditAttendanceDeduction(pointsSystem.attendanceDeduction.toString());
        setEditBehaviorDeduction(pointsSystem.behaviorDeduction.toString());
        setEditConflictDeduction(pointsSystem.conflictDeduction.toString());
        setEditExpelledDeduction(pointsSystem.expelledDeduction.toString());
        setEditMoodDeduction(pointsSystem.moodDeduction.toString());
        setEditSecludedDeduction(pointsSystem.secludedDeduction.toString());
        setEditSipDeduction(pointsSystem.sipDeduction.toString());
        setEditDailyIncrease(pointsSystem.dailyIncrease.toString());
        setIsEditing(true);
    };

    const cancelEditing = () => {
        setIsEditing(false);
    };

    const saveSettings = async () => {
        if (!profile?.token || !pointsSystem) {
            showErrorMessage("Not authenticated");
            return;
        }

        const attendanceDeduction = parseInt(editAttendanceDeduction, 10);
        const behaviorDeduction = parseInt(editBehaviorDeduction, 10);
        const conflictDeduction = parseInt(editConflictDeduction, 10);
        const expelledDeduction = parseInt(editExpelledDeduction, 10);
        const moodDeduction = parseInt(editMoodDeduction, 10);
        const secludedDeduction = parseInt(editSecludedDeduction, 10);
        const sipDeduction = parseInt(editSipDeduction, 10);
        const dailyIncrease = parseInt(editDailyIncrease, 10);

        if (isNaN(attendanceDeduction) || isNaN(behaviorDeduction) || isNaN(conflictDeduction) ||
            isNaN(expelledDeduction) || isNaN(moodDeduction) || isNaN(secludedDeduction) ||
            isNaN(sipDeduction) || isNaN(dailyIncrease)) {
            showErrorMessage("All values must be valid numbers");
            return;
        }

        try {
            setIsSaving(true);
            const response = await pointsSystemService.updatePointsSystem({
                attendanceDeduction,
                behaviorDeduction,
                conflictDeduction,
                expelledDeduction,
                moodDeduction,
                secludedDeduction,
                sipDeduction,
                dailyIncrease
            }, profile.token);

            showSuccessMessage("Points system updated successfully");
            setPointsSystem(response.pointsSystem);
            setIsEditing(false);
        } catch (error) {
            showErrorMessage(error instanceof Error ? error.message : 'Failed to update points system');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <MenuHeaderPage title="Points System Settings">
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#9cb43c" />
                </View>
            </MenuHeaderPage>
        );
    }

    if (!pointsSystem) {
        return (
            <MenuHeaderPage title="Points System Settings">
                <View className="flex-1 justify-center items-center">
                    <Text className="text-gray-400 text-base">No points system found</Text>
                </View>
            </MenuHeaderPage>
        );
    }

    const renderField = (label: string, value: number, editValue: string, setEditValue: (val: string) => void) => (
        <View className="flex-row items-center justify-between py-3 border-b border-gray-700">
            <Text className="text-white text-base flex-1">{label}</Text>
            {isEditing ? (
                <TextInput
                    className="bg-white rounded-lg px-3 py-2 text-black w-24 text-right"
                    value={editValue}
                    onChangeText={setEditValue}
                    keyboardType="numeric"
                    placeholderTextColor="#9ca3af"
                />
            ) : (
                <Text className="text-gray-400 text-base">{value}</Text>
            )}
        </View>
    );

    return (
        <MenuHeaderPage title="Points System Settings">
            <ScrollView className="flex-1 px-6 pt-6" contentContainerStyle={{ alignItems: 'center', paddingBottom: 24 }}>
                <View className="w-[60%]">
                    {/* Points System Info */}
                    <View className="bg-gray-800 rounded-xl p-4 mb-6">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-white text-xl font-bold">Point Values</Text>
                            {!isEditing && (
                                <IconButton
                                    className="bg-jarvisPrimary"
                                    iconProps={{
                                        name: 'pencil',
                                        color: '#000000',
                                        size: 20,
                                        type: IconType.MaterialCommunityIcons
                                    }}
                                    onIconClicked={startEditing}
                                />
                            )}
                        </View>

                        {/* Deductions Section */}
                        <Text className="text-gray-400 text-sm font-semibold mb-2 mt-2">Deductions</Text>
                        {renderField('Attendance Deduction', pointsSystem.attendanceDeduction, editAttendanceDeduction, setEditAttendanceDeduction)}
                        {renderField('Behavior Deduction', pointsSystem.behaviorDeduction, editBehaviorDeduction, setEditBehaviorDeduction)}
                        {renderField('Conflict Deduction', pointsSystem.conflictDeduction, editConflictDeduction, setEditConflictDeduction)}
                        {renderField('Expelled Deduction', pointsSystem.expelledDeduction, editExpelledDeduction, setEditExpelledDeduction)}
                        {renderField('Mood Deduction', pointsSystem.moodDeduction, editMoodDeduction, setEditMoodDeduction)}
                        {renderField('Secluded Deduction', pointsSystem.secludedDeduction, editSecludedDeduction, setEditSecludedDeduction)}
                        {renderField('SIP Deduction', pointsSystem.sipDeduction, editSipDeduction, setEditSipDeduction)}

                        {/* Increases Section */}
                        <Text className="text-gray-400 text-sm font-semibold mb-2 mt-4">Increases</Text>
                        {renderField('Daily Increase', pointsSystem.dailyIncrease, editDailyIncrease, setEditDailyIncrease)}

                        {/* Action Buttons */}
                        {isEditing && (
                            <View className="flex-row gap-3 mt-6">
                                <Pressable
                                    onPress={cancelEditing}
                                    className="flex-1 bg-gray-600 rounded-lg py-3"
                                >
                                    <Text className="text-white text-center font-semibold">Cancel</Text>
                                </Pressable>
                                <Pressable
                                    onPress={saveSettings}
                                    disabled={isSaving}
                                    className={`flex-1 bg-jarvisPrimary rounded-lg py-3 ${isSaving ? 'opacity-50' : ''}`}
                                >
                                    <Text className="text-black text-center font-semibold">
                                        {isSaving ? 'Saving...' : 'Save'}
                                    </Text>
                                </Pressable>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </MenuHeaderPage>
    )
}

export default SystemPointsSettingsPage;
