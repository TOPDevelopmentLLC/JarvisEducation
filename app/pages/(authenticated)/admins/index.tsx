import MenuHeaderPage from "components/pages/MenuHeaderPage";
import { router } from 'expo-router';
import AddAdminModal from "components/modals/AddAdminModal";
import ConfirmationModal from "components/modals/ConfirmationModal";
import { useState } from "react";
import { View, Text } from "react-native";
import { Administrator } from "lib/models/administrator";
import AdministratorList from "components/lists/AdministratorList";
import SearchBar from "components/SearchBar";
import IconButton from "components/buttons/IconButton";
import { IconType } from "components/IconContainer";
import { useStoredAdminData } from "components/contexts/AdminContext";


const AdministratorListPage = () => {
    const { admins, setSelectedAdmin, deleteAdmin } = useStoredAdminData();
    const [addAdminModalIsVisible, setAddAdminModalIsVisible] = useState(false);
    const [confirmDeleteModalIsVisible, setConfirmDeleteModalIsVisible] = useState(false);
    const [adminToDelete, setAdminToDelete] = useState<Administrator | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredAdmins = admins.filter(admin =>
        admin.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

    const confirmDelete = () => {
        if (adminToDelete) {
            deleteAdmin(adminToDelete.adminId);
        }
        setConfirmDeleteModalIsVisible(false);
        setAdminToDelete(null);
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
                </View>
            </View>
        </MenuHeaderPage>
    )
}

export default AdministratorListPage;