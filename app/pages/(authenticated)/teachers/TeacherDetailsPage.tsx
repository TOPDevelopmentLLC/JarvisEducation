import { useStoredTeacherData } from "components/contexts/TeacherContext";
import { useStoredCourseData } from "components/contexts/CourseContext";
import DetailsHeaderPage from "components/pages/DetailsHeaderPage";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import BaseButton from "components/buttons/BaseButton";
import IconContainer, { IconType } from "components/IconContainer";


const TeacherDetailsPage = () => {
    const { selectedTeacher, setSelectedTeacher } = useStoredTeacherData();
    const { courses } = useStoredCourseData();
    const { edit } = useLocalSearchParams();
    const [inEditMode, setEditMode] = useState<boolean>(edit === '1');
    const [currentTeacherName, setCurrentTeacherName] = useState(selectedTeacher.name);

    // Get all courses assigned to this teacher
    const assignedCourses = courses.filter(course =>
        selectedTeacher.assignedCourseIds?.includes(course.courseId)
    );

    const saveButtonPressed = () => {
        setEditMode(false);
        //todo: send api call
    }

    const editButtonPressed = () => {
        setEditMode(true);
    }

    const cancelButtonPressed = () => {
        setEditMode(false);
        setCurrentTeacherName(selectedTeacher.name);
    }

    return (
        <DetailsHeaderPage
            title="Teacher Details"
            backButtonAction={() => setSelectedTeacher(null)}
        >
            <ScrollView className="flex-1 px-6 pt-6">
                <View className="max-w-2xl w-full mx-auto">
                    {/* Header Card */}
                    <View className="bg-gray-800 rounded-xl p-6 mb-6">
                        <View className="flex-row items-center mb-4">
                            <View className="bg-jarvisPrimary rounded-full p-3 mr-4">
                                <IconContainer 
                                    iconProps={{
                                        name: 'school',
                                        size: 32,
                                        color: '#000',
                                        type: IconType.MaterialCommunityIcons
                                    }} 
                                />
                            </View>
                            <View className="flex-1">
                                <Text className="text-gray-400 text-sm">Teacher</Text>
                                <Text className="text-white text-2xl font-bold">{selectedTeacher.name}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Details Card */}
                    <View className="bg-gray-800 rounded-xl p-6 mb-6">
                        <Text className="text-white text-xl font-bold mb-6">Information</Text>

                        {/* Full Name Field */}
                        <View className="mb-6">
                            <Text className="text-gray-400 text-sm mb-2">Full Name</Text>
                            {inEditMode ? (
                                <TextInput
                                    className="bg-gray-700 text-white rounded-lg px-4 py-3 text-base"
                                    value={currentTeacherName}
                                    onChangeText={setCurrentTeacherName}
                                    placeholderTextColor="#9CA3AF"
                                />
                            ) : (
                                <View className="px-4 py-3">
                                    <Text className="text-white text-base">{currentTeacherName}</Text>
                                </View>
                            )}
                        </View>

                        {/* Assigned Courses Field */}
                        <View className="mb-6">
                            <Text className="text-gray-400 text-sm mb-2">Assigned Courses</Text>
                            <View className="px-4 py-3">
                                {assignedCourses.length > 0 ? (
                                    <View>
                                        {assignedCourses.map((course, index) => (
                                            <Text key={course.courseId} className="text-white text-base">
                                                {index > 0 && '\n'}
                                                • {course.title}
                                            </Text>
                                        ))}
                                    </View>
                                ) : (
                                    <Text className="text-white text-base">None</Text>
                                )}
                            </View>
                        </View>
                    </View>

                    {/* Action Buttons */}
                    <View className="gap-3 mb-6">
                        {inEditMode ? (
                            <>
                                <BaseButton
                                    title="Save Changes"
                                    className="bg-jarvisPrimary rounded-lg items-center active:opacity-70"
                                    textClassName="text-black text-base font-semibold"
                                    onPress={saveButtonPressed}
                                />
                                <BaseButton
                                    title="Cancel"
                                    className="bg-gray-700 rounded-lg items-center active:opacity-70"
                                    textClassName="text-white text-base font-semibold"
                                    onPress={cancelButtonPressed}
                                />
                            </>
                        ) : (
                            <BaseButton
                                title="Edit Information"
                                className="bg-jarvisPrimary rounded-lg items-center active:opacity-70"
                                textClassName="text-black text-base font-semibold"
                                onPress={editButtonPressed}
                            />
                        )}
                    </View>
                </View>
            </ScrollView>
        </DetailsHeaderPage>
    )
}

export default TeacherDetailsPage;