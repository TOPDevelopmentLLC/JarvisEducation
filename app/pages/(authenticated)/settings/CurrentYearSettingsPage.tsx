import MenuHeaderPage from "components/pages/MenuHeaderPage";
import { useState, useEffect } from "react";
import { View, Text, ScrollView, ActivityIndicator, Pressable, TextInput } from "react-native";
import { useProfile } from "components/contexts/ProfileContext";
import { useErrorSnackbar, useSuccessSnackbar } from "components/contexts/SnackbarContext";
import { schoolYearSettingsService } from "lib/services/schoolYearSettingsService";
import { SchoolYearSettings, Term, Holiday, BreakPeriod, SchedulePeriod } from "lib/models/schoolYearSettings";
import IconButton from "components/buttons/IconButton";
import { IconType } from "components/IconContainer";
import TermList from "components/lists/TermList";
import HolidayList from "components/lists/HolidayList";
import BreakPeriodList from "components/lists/BreakPeriodList";
import SchedulePeriodList from "components/lists/SchedulePeriodList";
import AddTermModal from "components/modals/AddTermModal";
import AddHolidayModal from "components/modals/AddHolidayModal";
import AddBreakModal from "components/modals/AddBreakModal";
import AddSchedulingPeriodModal from "components/modals/AddSchedulingPeriodModal";
import ConfirmationModal from "components/modals/ConfirmationModal";
import TimezonePickerModal from "components/modals/TimezonePickerModal";
import TermTypePickerModal from "components/modals/TermTypePickerModal";

const CurrentYearSettingsPage = () => {
    const { profile } = useProfile();
    const showErrorMessage = useErrorSnackbar();
    const showSuccessMessage = useSuccessSnackbar();

    const [settings, setSettings] = useState<SchoolYearSettings | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Inline editing states
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState('');
    const [editStartDate, setEditStartDate] = useState('');
    const [editEndDate, setEditEndDate] = useState('');
    const [editSchoolDayStart, setEditSchoolDayStart] = useState('');
    const [editSchoolDayEnd, setEditSchoolDayEnd] = useState('');
    const [editTimezone, setEditTimezone] = useState('');
    const [editTermType, setEditTermType] = useState('');
    const [timezonePickerVisible, setTimezonePickerVisible] = useState(false);
    const [termTypePickerVisible, setTermTypePickerVisible] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Modal visibility states
    const [addTermModalVisible, setAddTermModalVisible] = useState(false);
    const [addHolidayModalVisible, setAddHolidayModalVisible] = useState(false);
    const [addBreakModalVisible, setAddBreakModalVisible] = useState(false);
    const [addSchedulePeriodModalVisible, setAddSchedulePeriodModalVisible] = useState(false);

    // Delete confirmation states
    const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState(false);
    const [deleteType, setDeleteType] = useState<'term' | 'holiday' | 'break' | 'period' | null>(null);
    const [itemToDelete, setItemToDelete] = useState<Term | Holiday | BreakPeriod | SchedulePeriod | null>(null);

    useEffect(() => {
        fetchActiveSettings();
    }, []);

    const fetchActiveSettings = async () => {
        if (!profile?.token) {
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            const response = await schoolYearSettingsService.getActiveSettings(profile.token);
            setSettings(response.settings);
        } catch (error) {
            showErrorMessage(error instanceof Error ? error.message : 'Failed to fetch settings');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSettingsUpdated = (updatedSettings: SchoolYearSettings) => {
        setSettings(updatedSettings);
    };

    const startEditing = () => {
        if (!settings) return;
        setEditName(settings.name || '');
        setEditStartDate(settings.startDate || '');
        setEditEndDate(settings.endDate || '');
        setEditSchoolDayStart(settings.schoolDayStart || '');
        setEditSchoolDayEnd(settings.schoolDayEnd || '');
        setEditTimezone(settings.timezone || '');
        setEditTermType(settings.termType || '');
        setIsEditing(true);
    };

    const cancelEditing = () => {
        setIsEditing(false);
    };

    const saveSettings = async () => {
        if (editName.length === 0) {
            showErrorMessage("Please enter the school year name");
            return;
        }
        if (editStartDate.length === 0) {
            showErrorMessage("Please enter the start date (YYYY-MM-DD)");
            return;
        }
        if (editEndDate.length === 0) {
            showErrorMessage("Please enter the end date (YYYY-MM-DD)");
            return;
        }
        if (editSchoolDayStart.length === 0) {
            showErrorMessage("Please enter the school day start time (HH:mm)");
            return;
        }
        if (editSchoolDayEnd.length === 0) {
            showErrorMessage("Please enter the school day end time (HH:mm)");
            return;
        }
        if (editTimezone.length === 0) {
            showErrorMessage("Please select a timezone");
            return;
        }
        if (editTermType.length === 0) {
            showErrorMessage("Please select a term type");
            return;
        }

        if (!profile?.token || !settings) {
            showErrorMessage("Not authenticated");
            return;
        }

        try {
            setIsSaving(true);
            const response = await schoolYearSettingsService.updateSettings({
                name: editName,
                startDate: editStartDate,
                endDate: editEndDate,
                termType: editTermType,
                schoolDayStart: editSchoolDayStart,
                schoolDayEnd: editSchoolDayEnd,
                timezone: editTimezone
            }, profile.token);

            showSuccessMessage("Settings updated successfully");
            setSettings(response.settings);
            setIsEditing(false);
        } catch (error) {
            showErrorMessage(error instanceof Error ? error.message : 'Failed to update settings');
        } finally {
            setIsSaving(false);
        }
    };

    const getTimezoneLabel = (value: string) => {
        return value || 'Select Timezone';
    };

    const getTermTypeLabel = (value: string) => {
        return value || 'Select Term Type';
    };

    // Delete handlers
    const handleDeleteTerm = (term: Term) => {
        setDeleteType('term');
        setItemToDelete(term);
        setConfirmDeleteModalVisible(true);
    };

    const handleDeleteHoliday = (holiday: Holiday) => {
        setDeleteType('holiday');
        setItemToDelete(holiday);
        setConfirmDeleteModalVisible(true);
    };

    const handleDeleteBreak = (breakPeriod: BreakPeriod) => {
        setDeleteType('break');
        setItemToDelete(breakPeriod);
        setConfirmDeleteModalVisible(true);
    };

    const handleDeleteSchedulePeriod = (schedulePeriod: SchedulePeriod) => {
        setDeleteType('period');
        setItemToDelete(schedulePeriod);
        setConfirmDeleteModalVisible(true);
    };

    const confirmDelete = async () => {
        if (!profile?.token || !itemToDelete || !deleteType) return;

        try {
            switch (deleteType) {
                case 'term':
                    await schoolYearSettingsService.deleteTerm((itemToDelete as Term).id, profile.token);
                    showSuccessMessage('Term deleted successfully');
                    break;
                case 'holiday':
                    await schoolYearSettingsService.deleteHoliday((itemToDelete as Holiday).id, profile.token);
                    showSuccessMessage('Holiday deleted successfully');
                    break;
                case 'break':
                    await schoolYearSettingsService.deleteBreakPeriod((itemToDelete as BreakPeriod).id, profile.token);
                    showSuccessMessage('Break period deleted successfully');
                    break;
                case 'period':
                    await schoolYearSettingsService.deleteSchedulePeriod((itemToDelete as SchedulePeriod).id, profile.token);
                    showSuccessMessage('Schedule period deleted successfully');
                    break;
            }
            // Refresh settings after delete
            await fetchActiveSettings();
        } catch (error) {
            showErrorMessage(error instanceof Error ? error.message : 'Failed to delete');
        } finally {
            setConfirmDeleteModalVisible(false);
            setDeleteType(null);
            setItemToDelete(null);
        }
    };

    const cancelDelete = () => {
        setConfirmDeleteModalVisible(false);
        setDeleteType(null);
        setItemToDelete(null);
    };

    const getDeleteMessage = () => {
        if (!itemToDelete) return '';
        const name = 'name' in itemToDelete ? itemToDelete.name : '';
        return `Are you sure you want to delete "${name}"?`;
    };

    if (isLoading) {
        return (
            <MenuHeaderPage title="Current Year Settings">
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#9cb43c" />
                </View>
            </MenuHeaderPage>
        );
    }

    if (!settings) {
        return (
            <MenuHeaderPage title="Current Year Settings">
                <View className="flex-1 justify-center items-center">
                    <Text className="text-gray-400 text-base">No active school year settings found</Text>
                </View>
            </MenuHeaderPage>
        );
    }

    return (
        <MenuHeaderPage title="Current Year Settings">
            <ScrollView className="flex-1 px-6 pt-6" contentContainerStyle={{ alignItems: 'center', paddingBottom: 24 }}>
                <View className="w-[60%]">
                    {/* School Year Info */}
                    <View className="bg-gray-800 rounded-xl p-4 mb-6">
                        <View className="flex-row justify-between items-start">
                            <View className="flex-1">
                                {isEditing ? (
                                    <>
                                        <View className="mb-3">
                                            <Text className="text-gray-400 text-xs mb-1">Name</Text>
                                            <TextInput
                                                className="bg-white rounded-lg px-3 py-2 text-black"
                                                value={editName}
                                                onChangeText={setEditName}
                                                placeholder="School Year Name"
                                                placeholderTextColor="#9ca3af"
                                            />
                                        </View>
                                        <View className="flex-row gap-3 mb-3">
                                            <View className="flex-1">
                                                <Text className="text-gray-400 text-xs mb-1">Start Date</Text>
                                                <TextInput
                                                    className="bg-white rounded-lg px-3 py-2 text-black"
                                                    value={editStartDate}
                                                    onChangeText={setEditStartDate}
                                                    placeholder="YYYY-MM-DD"
                                                    placeholderTextColor="#9ca3af"
                                                />
                                            </View>
                                            <View className="flex-1">
                                                <Text className="text-gray-400 text-xs mb-1">End Date</Text>
                                                <TextInput
                                                    className="bg-white rounded-lg px-3 py-2 text-black"
                                                    value={editEndDate}
                                                    onChangeText={setEditEndDate}
                                                    placeholder="YYYY-MM-DD"
                                                    placeholderTextColor="#9ca3af"
                                                />
                                            </View>
                                        </View>
                                        <View className="flex-row gap-3 mb-3">
                                            <View className="flex-1">
                                                <Text className="text-gray-400 text-xs mb-1">School Day Start</Text>
                                                <TextInput
                                                    className="bg-white rounded-lg px-3 py-2 text-black"
                                                    value={editSchoolDayStart}
                                                    onChangeText={setEditSchoolDayStart}
                                                    placeholder="HH:mm"
                                                    placeholderTextColor="#9ca3af"
                                                />
                                            </View>
                                            <View className="flex-1">
                                                <Text className="text-gray-400 text-xs mb-1">School Day End</Text>
                                                <TextInput
                                                    className="bg-white rounded-lg px-3 py-2 text-black"
                                                    value={editSchoolDayEnd}
                                                    onChangeText={setEditSchoolDayEnd}
                                                    placeholder="HH:mm"
                                                    placeholderTextColor="#9ca3af"
                                                />
                                            </View>
                                        </View>
                                        <View className="flex-row gap-3 mb-3">
                                            <View className="flex-1">
                                                <Text className="text-gray-400 text-xs mb-1">Timezone</Text>
                                                <Pressable
                                                    onPress={() => setTimezonePickerVisible(true)}
                                                    className="bg-white rounded-lg px-3 py-2"
                                                >
                                                    <Text className={editTimezone ? "text-black" : "text-gray-400"}>
                                                        {getTimezoneLabel(editTimezone)}
                                                    </Text>
                                                </Pressable>
                                            </View>
                                            <View className="flex-1">
                                                <Text className="text-gray-400 text-xs mb-1">Term Type</Text>
                                                <Pressable
                                                    onPress={() => setTermTypePickerVisible(true)}
                                                    className="bg-white rounded-lg px-3 py-2"
                                                >
                                                    <Text className={editTermType ? "text-black" : "text-gray-400"}>
                                                        {getTermTypeLabel(editTermType)}
                                                    </Text>
                                                </Pressable>
                                            </View>
                                        </View>
                                    </>
                                ) : (
                                    <>
                                        <Text className="text-white text-2xl font-bold">{settings.name}</Text>
                                        <Text className="text-gray-400 text-sm mt-2">
                                            {settings.startDate || 'Start date not set'} - {settings.endDate || 'End date not set'}
                                        </Text>
                                        <Text className="text-gray-400 text-sm mt-1">
                                            Term Type: {settings.termType}
                                        </Text>
                                        <Text className="text-gray-400 text-sm mt-1">
                                            School Day: {settings.schoolDayStart || 'Not set'} - {settings.schoolDayEnd || 'Not set'}
                                        </Text>
                                        <Text className="text-gray-400 text-sm mt-1">
                                            Timezone: {settings.timezone}
                                        </Text>
                                    </>
                                )}
                            </View>
                            <View className="flex-row gap-2">
                                {isEditing ? (
                                    <>
                                        <IconButton
                                            className="bg-gray-600"
                                            iconProps={{
                                                name: 'close',
                                                color: '#FFFFFF',
                                                size: 20,
                                                type: IconType.MaterialCommunityIcons
                                            }}
                                            onIconClicked={cancelEditing}
                                        />
                                        <IconButton
                                            className="bg-jarvisPrimary"
                                            iconProps={{
                                                name: 'check',
                                                color: '#000000',
                                                size: 20,
                                                type: IconType.MaterialCommunityIcons
                                            }}
                                            onIconClicked={saveSettings}
                                            disabled={isSaving}
                                        />
                                    </>
                                ) : (
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
                        </View>
                    </View>

                    {/* Terms Section */}
                    <View className="mb-6">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-white text-xl font-bold">Terms</Text>
                            <IconButton
                                className="bg-jarvisPrimary"
                                iconProps={{
                                    name: 'plus',
                                    color: '#000000',
                                    size: 24,
                                    type: IconType.MaterialCommunityIcons
                                }}
                                onIconClicked={() => setAddTermModalVisible(true)}
                            />
                        </View>
                        {settings.terms.length > 0 ? (
                            <TermList
                                terms={settings.terms}
                                deleteButtonPressed={handleDeleteTerm}
                            />
                        ) : (
                            <Text className="text-gray-400 text-base">No terms added</Text>
                        )}
                    </View>

                    {/* Holidays Section */}
                    <View className="mb-6">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-white text-xl font-bold">Holidays</Text>
                            <IconButton
                                className="bg-jarvisPrimary"
                                iconProps={{
                                    name: 'plus',
                                    color: '#000000',
                                    size: 24,
                                    type: IconType.MaterialCommunityIcons
                                }}
                                onIconClicked={() => setAddHolidayModalVisible(true)}
                            />
                        </View>
                        {settings.holidays.length > 0 ? (
                            <HolidayList
                                holidays={settings.holidays}
                                deleteButtonPressed={handleDeleteHoliday}
                            />
                        ) : (
                            <Text className="text-gray-400 text-base">No holidays added</Text>
                        )}
                    </View>

                    {/* Break Periods Section */}
                    <View className="mb-6">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-white text-xl font-bold">Break Periods</Text>
                            <IconButton
                                className="bg-jarvisPrimary"
                                iconProps={{
                                    name: 'plus',
                                    color: '#000000',
                                    size: 24,
                                    type: IconType.MaterialCommunityIcons
                                }}
                                onIconClicked={() => setAddBreakModalVisible(true)}
                            />
                        </View>
                        {settings.breakPeriods.length > 0 ? (
                            <BreakPeriodList
                                breakPeriods={settings.breakPeriods}
                                deleteButtonPressed={handleDeleteBreak}
                            />
                        ) : (
                            <Text className="text-gray-400 text-base">No break periods added</Text>
                        )}
                    </View>

                    {/* Schedule Periods Section */}
                    <View className="mb-6">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-white text-xl font-bold">Schedule Periods</Text>
                            <IconButton
                                className="bg-jarvisPrimary"
                                iconProps={{
                                    name: 'plus',
                                    color: '#000000',
                                    size: 24,
                                    type: IconType.MaterialCommunityIcons
                                }}
                                onIconClicked={() => setAddSchedulePeriodModalVisible(true)}
                            />
                        </View>
                        {settings.schedulePeriods.length > 0 ? (
                            <SchedulePeriodList
                                schedulePeriods={settings.schedulePeriods}
                                deleteButtonPressed={handleDeleteSchedulePeriod}
                            />
                        ) : (
                            <Text className="text-gray-400 text-base">No schedule periods added</Text>
                        )}
                    </View>
                </View>
            </ScrollView>

            {/* Picker Modals */}
            <TimezonePickerModal
                isVisible={timezonePickerVisible}
                selectedTimezone={editTimezone}
                onTimezoneSelected={setEditTimezone}
                onDismiss={() => setTimezonePickerVisible(false)}
            />

            <TermTypePickerModal
                isVisible={termTypePickerVisible}
                selectedTermType={editTermType}
                onTermTypeSelected={setEditTermType}
                onDismiss={() => setTermTypePickerVisible(false)}
            />

            {/* Other Modals */}
            <AddTermModal
                isVisible={addTermModalVisible}
                onDismiss={() => setAddTermModalVisible(false)}
                onTermAdded={handleSettingsUpdated}
            />

            <AddHolidayModal
                isVisible={addHolidayModalVisible}
                onDismiss={() => setAddHolidayModalVisible(false)}
                onHolidayAdded={handleSettingsUpdated}
            />

            <AddBreakModal
                isVisible={addBreakModalVisible}
                onDismiss={() => setAddBreakModalVisible(false)}
                onBreakAdded={handleSettingsUpdated}
            />

            <AddSchedulingPeriodModal
                isVisible={addSchedulePeriodModalVisible}
                onDismiss={() => setAddSchedulePeriodModalVisible(false)}
                onPeriodAdded={handleSettingsUpdated}
            />

            <ConfirmationModal
                isVisible={confirmDeleteModalVisible}
                title="Confirm Delete"
                message={getDeleteMessage()}
                confirmText="Delete"
                cancelText="Cancel"
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
            />
        </MenuHeaderPage>
    )
}

export default CurrentYearSettingsPage;
