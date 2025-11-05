import { useStoredCourseData } from "components/contexts/CourseContext";
import { useStoredTeacherData } from "components/contexts/TeacherContext";
import DetailsHeaderPage from "components/pages/DetailsHeaderPage";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import AssignTeacherModal from "components/modals/AssignTeacherModal";
import BaseButton from "components/buttons/BaseButton";
import IconContainer, { IconType } from "components/IconContainer";


const CourseDetailsPage = () => {
    const { selectedCourse, setSelectedCourse, assignTeacherToCourse } = useStoredCourseData();
    const { teachers } = useStoredTeacherData();
    const { edit } = useLocalSearchParams();
    const [inEditMode, setEditMode] = useState<boolean>(edit === '1');
    const [currentCourseTitle, setCurrentCourseTitle] = useState(selectedCourse.title);
    const [currentCourseDescription, setCurrentCourseDescription] = useState(selectedCourse.description);
    const [currentClassroomNumber, setCurrentClassroomNumber] = useState(selectedCourse.classroomNumber ?? '');
    const [currentStartTime, setCurrentStartTime] = useState(selectedCourse.startTime ?? '');
    const [currentEndTime, setCurrentEndTime] = useState(selectedCourse.endTime ?? '');
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
        setCurrentStartTime(selectedCourse.startTime ?? '');
        setCurrentEndTime(selectedCourse.endTime ?? '');
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
                                <IconContainer 
                                    iconProps={{
                                        name: 'book-open-variant',
                                        size: 32,
                                        color: '#000',
                                        type: IconType.MaterialCommunityIcons
                                    }} 
                                />
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

                        {/* Start Time Field */}
                        <View className="mb-6">
                            <Text className="text-gray-400 text-sm mb-2">Start Time</Text>
                            {inEditMode ? (
                                <TextInput
                                    className="bg-gray-700 text-white rounded-lg px-4 py-3 text-base"
                                    value={currentStartTime}
                                    onChangeText={setCurrentStartTime}
                                    placeholderTextColor="#9CA3AF"
                                    placeholder="Enter start time..."
                                />
                            ) : (
                                <View className="px-4 py-3">
                                    <Text className="text-white text-base">
                                        {currentStartTime || 'Not assigned'}
                                    </Text>
                                </View>
                            )}
                        </View>

                        {/* End Time Field */}
                        <View className="mb-6">
                            <Text className="text-gray-400 text-sm mb-2">End Time</Text>
                            {inEditMode ? (
                                <TextInput
                                    className="bg-gray-700 text-white rounded-lg px-4 py-3 text-base"
                                    value={currentEndTime}
                                    onChangeText={setCurrentEndTime}
                                    placeholderTextColor="#9CA3AF"
                                    placeholder="Enter end time..."
                                />
                            ) : (
                                <View className="px-4 py-3">
                                    <Text className="text-white text-base">
                                        {currentEndTime || 'Not assigned'}
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
                            <>
                                <BaseButton
                                    title="Edit Information"
                                    className="bg-jarvisPrimary rounded-lg items-center active:opacity-70"
                                    textClassName="text-black text-base font-semibold"
                                    onPress={editButtonPressed}
                                />
                                <BaseButton
                                    title="Assign Teacher"
                                    className="bg-jarvisPrimary rounded-lg items-center active:opacity-70"
                                    textClassName="text-black text-base font-semibold"
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