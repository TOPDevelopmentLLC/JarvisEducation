import MenuHeaderPage from "components/pages/MenuHeaderPage";
import { router } from 'expo-router';
import AddAdminModal from "components/modals/AddAdminModal";
import ConfirmationModal from "components/modals/ConfirmationModal";
import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Administrator } from "lib/models/administrator";
import AdministratorList from "components/lists/AdministratorList";
import SearchBar from "components/SearchBar";
import IconButton from "components/buttons/IconButton";
import { IconType } from "components/IconContainer";
import { useStoredAdminData } from "components/contexts/AdminContext";
import { apiService } from "lib/services/apiService";
import { useProfile } from "components/contexts/ProfileContext";
import LoadingModal from "components/modals/LoadingModal";
import AlertModal from "components/modals/AlertModal";


const AdministratorListPage = () => {
    const { admins, setSelectedAdmin, deleteAdmin, setAdmins } = useStoredAdminData();
    const { profile } = useProfile();
    const [addAdminModalIsVisible, setAddAdminModalIsVisible] = useState(false);
    const [confirmDeleteModalIsVisible, setConfirmDeleteModalIsVisible] = useState(false);
    const [adminToDelete, setAdminToDelete] = useState<Administrator | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const filteredAdmins = admins.filter(admin =>
        admin.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const showAlert = (title: string, message: string) => {
        setAlertTitle(title);
        setAlertMessage(message);
        setAlertVisible(true);
    };

    // Fetch administrators on page load
    useEffect(() => {
        const fetchAdministrators = async () => {
            if (!profile?.token) return;

            try {
                setLoading(true);
                const response = await apiService.getAdministrators(profile.token);

                // Convert API administrators to local Administrator format
                const convertedAdmins: Administrator[] = response.map(apiAdmin => ({
                    adminId: apiAdmin.id.toString(),
                    name: apiAdmin.name
                }));

                setAdmins(convertedAdmins);
            } catch (error) {
                console.error("Failed to fetch administrators:", error);
                showAlert("Error", error instanceof Error ? error.message : "Failed to load administrators");
            } finally {
                setLoading(false);
            }
        };

        fetchAdministrators();
    }, [profile?.token]);

    const handleAddButtonPressed = () => {
        setAddAdminModalIsVisible(true);
    }

    const handleEditAdmin = (admin: Administrator) => {
        setSelectedAdmin(admin);
        router.push({
            pathname: '/pages/admins/AdministratorDetailsPage',
            params: {
                edit: 1
            }
        });
    }

    const handleDeleteAdmin = (admin: Administrator) => {
        setAdminToDelete(admin);
        setConfirmDeleteModalIsVisible(true);
    }

    const confirmDelete = async () => {
        if (!adminToDelete || !profile?.token) {
            setConfirmDeleteModalIsVisible(false);
            setAdminToDelete(null);
            return;
        }

        try {
            setLoading(true);
            await apiService.deleteAdministrator(adminToDelete.adminId, profile.token);

            // Remove from local state
            deleteAdmin(adminToDelete.adminId);

            setConfirmDeleteModalIsVisible(false);
            setAdminToDelete(null);
        } catch (error) {
            console.error("Failed to delete administrator:", error);
            showAlert("Delete Failed", error instanceof Error ? error.message : "Failed to delete administrator");
            setConfirmDeleteModalIsVisible(false);
            setAdminToDelete(null);
        } finally {
            setLoading(false);
        }
    }

    const cancelDelete = () => {
        setConfirmDeleteModalIsVisible(false);
        setAdminToDelete(null);
    }

    const handleViewAdmin = (admin: Administrator) => {
        setSelectedAdmin(admin);
        router.push({
            pathname: '/pages/admins/AdministratorDetailsPage',
            params: {
                edit: 0
            }
        });
    }

    return (
        <MenuHeaderPage title="Administrators">
            <View className="flex-1">
                <View className="w-[60%] mx-auto px-6 pt-4 flex-1">
                {/* Header Section with Search and Add Button */}
                <View className="mb-4">
                    <View className="flex-row items-center gap-3 mb-4">
                        <SearchBar 
                            className="flex-1 px-4 py-3"
                            placeholder={"Search administrators..."} 
                            value={searchQuery} 
                            onValueChanged={setSearchQuery} 
                        />
                        <IconButton 
                            className="bg-jarvisPrimary"
                            iconProps={{
                                name: 'plus',
                                size: 24, 
                                color: '#000000',
                                type: IconType.MaterialCommunityIcons
                            }} 
                            onIconClicked={handleAddButtonPressed} 
                        />
                    </View>

                    <Text className="text-gray-400 text-sm">
                        {filteredAdmins.length} {filteredAdmins.length === 1 ? 'administrator' : 'administrators'} found
                    </Text>
                </View>

                <AdministratorList 
                    className="flex-1"
                    administrators={filteredAdmins} 
                    currentSearchText={searchQuery} 
                    editButtonPressed={handleEditAdmin} 
                    deleteButtonPressed={handleDeleteAdmin} 
                    adminItemPressed={handleViewAdmin} 
                />
                <AddAdminModal
                    isVisible={addAdminModalIsVisible}
                    onDismiss={() => setAddAdminModalIsVisible(false)}
                />
                <ConfirmationModal
                    isVisible={confirmDeleteModalIsVisible}
                    title="Delete Administrator"
                    message={`Are you sure you want to delete ${adminToDelete?.name}? This action cannot be undone.`}
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
                <LoadingModal
                    isVisible={loading}
                    message="Processing..."
                />
                <AlertModal
                    isVisible={alertVisible}
                    title={alertTitle}
                    message={alertMessage}
                    onConfirm={() => setAlertVisible(false)}
                />
                </View>
            </View>
        </MenuHeaderPage>
    )
}

export default AdministratorListPage;