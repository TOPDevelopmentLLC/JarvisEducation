import { useStoredCourseData } from "components/contexts/CourseContext";
import { useStoredTeacherData } from "components/contexts/TeacherContext";
import DetailsHeaderPage from "components/pages/DetailsHeaderPage";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, ScrollView, Pressable } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AssignTeacherModal from "components/modals/AssignTeacherModal";
import JarvisButton from "components/buttons/JarvisButton";


const CourseDetailsPage = () => {
    const { selectedCourse, setSelectedCourse, assignTeacherToCourse } = useStoredCourseData();
    const { teachers } = useStoredTeacherData();
    const { edit } = useLocalSearchParams();
    const [inEditMode, setEditMode] = useState<boolean>(edit === '1');
    const [currentCourseTitle, setCurrentCourseTitle] = useState(selectedCourse.title);
    const [currentCourseDescription, setCurrentCourseDescription] = useState(selectedCourse.description);
    const [currentClassroomNumber, setCurrentClassroomNumber] = useState(selectedCourse.classroomNumber ?? '');
    const [assignTeacherModalIsVisible, setAssignTeacherModalIsVisible] = useState(false);

    // Get the assigned teacher
    const assignedTeacher = teachers.find(t => t.teacherId === selectedCourse?.assignedTeacherId);

    const saveButtonPressed = () => {
        setEditMode(false);
        //todo: send api call
    }

    const editButtonPressed = () => {
        setEditMode(true);
    }

    const cancelButtonPressed = () => {
        setEditMode(false);
        setCurrentCourseTitle(selectedCourse.title);
        setCurrentCourseDescription(selectedCourse.description);
        setCurrentClassroomNumber(selectedCourse.classroomNumber ?? '');
    }

    return (
        <DetailsHeaderPage
            title="Course Details"
            backButtonAction={() => setSelectedCourse(null)}
        >
            <ScrollView className="flex-1 px-6 pt-6">
                <View className="max-w-2xl w-full mx-auto">
                    {/* Header Card */}
                    <View className="bg-gray-800 rounded-xl p-6 mb-6">
                        <View className="flex-row items-center mb-4">
                            <View className="bg-jarvisPrimary rounded-full p-3 mr-4">
                                <MaterialCommunityIcons name="book-open-variant" size={32} color="#000" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-gray-400 text-sm">Course</Text>
                                <Text className="text-white text-2xl font-bold">{selectedCourse.title}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Details Card */}
                    <View className="bg-gray-800 rounded-xl p-6 mb-6">
                        <Text className="text-white text-xl font-bold mb-6">Course Information</Text>

                        {/* Title Field */}
                        <View className="mb-6">
                            <Text className="text-gray-400 text-sm mb-2">Course Title</Text>
                            {inEditMode ? (
                                <TextInput
                                    className="bg-gray-700 text-white rounded-lg px-4 py-3 text-base"
                                    value={currentCourseTitle}
                                    onChangeText={setCurrentCourseTitle}
                                    placeholderTextColor="#9CA3AF"
                                />
                            ) : (
                                <View className="px-4 py-3">
                                    <Text className="text-white text-base">{currentCourseTitle}</Text>
                                </View>
                            )}
                        </View>

                        {/* Description Field */}
                        <View className="mb-6">
                            <Text className="text-gray-400 text-sm mb-2">Description</Text>
                            {inEditMode ? (
                                <TextInput
                                    className="bg-gray-700 text-white rounded-lg px-4 py-3 text-base"
                                    value={currentCourseDescription}
                                    onChangeText={setCurrentCourseDescription}
                                    placeholderTextColor="#9CA3AF"
                                    multiline
                                    numberOfLines={4}
                                    textAlignVertical="top"
                                />
                            ) : (
                                <View className="px-4 py-3">
                                    <Text className="text-white text-base">{currentCourseDescription}</Text>
                                </View>
                            )}
                        </View>

                        {/* Classroom Number Field */}
                        <View className="mb-6">
                            <Text className="text-gray-400 text-sm mb-2">Classroom Number</Text>
                            {inEditMode ? (
                                <TextInput
                                    className="bg-gray-700 text-white rounded-lg px-4 py-3 text-base"
                                    value={currentClassroomNumber}
                                    onChangeText={setCurrentClassroomNumber}
                                    placeholderTextColor="#9CA3AF"
                                    placeholder="Enter classroom number..."
                                />
                            ) : (
                                <View className="px-4 py-3">
                                    <Text className="text-white text-base">
                                        {currentClassroomNumber || 'Not assigned'}
                                    </Text>
                                </View>
                            )}
                        </View>

                        {/* Assigned Teacher Field */}
                        <View className="mb-6">
                            <Text className="text-gray-400 text-sm mb-2">Assigned Teacher</Text>
                            <View className="px-4 py-3">
                                <Text className="text-white text-base">
                                    {assignedTeacher ? assignedTeacher.name : 'None'}
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Action Buttons */}
                    <View className="gap-3 mb-6">
                        {inEditMode ? (
                            <>
                                <Pressable
                                    className="bg-jarvisPrimary rounded-lg p-4 items-center active:opacity-70"
                                    onPress={saveButtonPressed}>
                                    <Text className="text-black text-base font-semibold">Save Changes</Text>
                                </Pressable>
                                <Pressable
                                    className="bg-gray-700 rounded-lg p-4 items-center active:opacity-70"
                                    onPress={cancelButtonPressed}>
                                    <Text className="text-white text-base font-semibold">Cancel</Text>
                                </Pressable>
                            </>
                        ) : (
                            <>
                                <Pressable
                                    className="bg-jarvisPrimary rounded-lg p-4 items-center active:opacity-70"
                                    onPress={editButtonPressed}>
                                    <Text className="text-black text-base font-semibold">Edit Information</Text>
                                </Pressable>
                                <JarvisButton
                                    title="Assign Teacher"
                                    onPress={() => setAssignTeacherModalIsVisible(true)}
                                />
                            </>
                        )}
                    </View>
                </View>
            </ScrollView>
            <AssignTeacherModal
                isVisible={assignTeacherModalIsVisible}
                onDismiss={() => setAssignTeacherModalIsVisible(false)}
                course={selectedCourse}
            />
        </DetailsHeaderPage>
    )
}

export default CourseDetailsPage;