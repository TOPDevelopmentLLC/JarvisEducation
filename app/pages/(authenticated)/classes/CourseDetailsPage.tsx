import JarvisButton from "components/buttons/JarvisButton";
import { useStoredCourseData } from "components/contexts/CourseContext";
import EditableDataField from "components/EditableDataField";
import DetailsHeaderPage from "components/pages/DetailsHeaderPage";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View } from "react-native";


const CourseDetailsPage = () => {
    const { selectedCourse } = useStoredCourseData();
    const { edit } = useLocalSearchParams();
    const [inEditMode,setEditMode] = useState<boolean>(edit === '1');
    const [currentCourseTitle,setCurrentCourseTitle] = useState(selectedCourse.title);
    const [currentCourseDescription,setCurrentCourseDescription] = useState(selectedCourse.description);

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
                    title={"Title:"} 
                    initialValue={currentCourseTitle} 
                    inEditMode={inEditMode} 
                    onValueUpdated={updatedTitle => setCurrentCourseTitle(updatedTitle)} 
                />
                <EditableDataField 
                    title={"Description:"} 
                    initialValue={currentCourseDescription} 
                    inEditMode={inEditMode} 
                    onValueUpdated={updatedDescription => setCurrentCourseDescription(updatedDescription)} 
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

export default CourseDetailsPage;