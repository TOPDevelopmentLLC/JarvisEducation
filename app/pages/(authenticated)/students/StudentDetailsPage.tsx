import JarvisButton from "components/buttons/JarvisButton";
import { useStoredStudentData } from "components/contexts/StudentContext";
import EditableDataField from "components/EditableDataField";
import DetailsHeaderPage from "components/pages/DetailsHeaderPage";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View } from "react-native";


const StudentDetailsPage = () => {
    const { selectedStudent } = useStoredStudentData();
    const { edit } = useLocalSearchParams();
    const [inEditMode,setEditMode] = useState<boolean>(edit === '1');
    const [currentStudentName,setCurrentStudentName] = useState(selectedStudent.name);

    const saveButtonPressed = () => {
        setEditMode(false);
        //todo: send api call
    }

    const editButtonPressed = () => {
        setEditMode(true);
    }

    return (
        <DetailsHeaderPage title="Details">
            <View className="mx-auto h-screen w-1/2 flex-1 justify-between items-center p-4">
                <EditableDataField 
                    title={"Full Name:"} 
                    initialValue={currentStudentName} 
                    inEditMode={inEditMode} 
                    onValueUpdated={updatedName => setCurrentStudentName(updatedName)} 
                />
                <View className="w-full">
                    {
                        inEditMode ? (
                            <JarvisButton 
                                title={"Save"} 
                                onPress={saveButtonPressed} 
                            />
                        ) : (
                            <JarvisButton 
                                title={"Edit"} 
                                onPress={editButtonPressed} 
                            />
                        )
                    }
                </View>
            </View>
        </DetailsHeaderPage>
    )
}

export default StudentDetailsPage;