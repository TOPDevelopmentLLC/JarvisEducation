import { useStoredReportData } from "components/contexts/ReportContext";
import { useStoredStudentData } from "components/contexts/StudentContext";
import DetailsHeaderPage from "components/pages/DetailsHeaderPage";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import BaseButton from "components/buttons/BaseButton";
import IconContainer, { IconType } from "components/IconContainer";
import CommentList from "components/lists/CommentList";
import { Comment } from "lib/models/comment";
import AlertModal from "components/modals/AlertModal";


const ReportDetailsPage = () => {
    const { selectedReport, setSelectedReport } = useStoredReportData();
    const { students } = useStoredStudentData();
    const { edit } = useLocalSearchParams();
    const [inEditMode, setEditMode] = useState<boolean>(edit === '1');
    const [currentReportDescription, setCurrentReportDescription] = useState(selectedReport.description ?? '');
    const [newCommentText, setNewCommentText] = useState('');
    const [showEmptyCommentAlert, setShowEmptyCommentAlert] = useState(false);

    // Get the assigned student
    const assignedStudent = students.find(student => student.studentId === selectedReport.studentId);

    // Get comments for this report
    const reportComments = selectedReport.comments || [];

    const saveButtonPressed = () => {
        setEditMode(false);
        //todo: send api call
    }

    const editButtonPressed = () => {
        setEditMode(true);
    }

    const cancelButtonPressed = () => {
        setEditMode(false);
        setCurrentReportDescription(selectedReport.description ?? '');
    }

    const addCommentPressed = () => {
        if (newCommentText.trim() === '') {
            setShowEmptyCommentAlert(true);
            return;
        }

        const newComment: Comment = {
            commentId: Date.now().toString(),
            fullName: 'Current User', // TODO: Replace with actual user name from auth context
            bodyText: newCommentText.trim(),
            timestamp: new Date(),
            reportId: selectedReport.reportId
        };

        // TODO: Add comment to report context and send API call
        // For now, we'll just clear the input
        setNewCommentText('');
    }

    const closeEmptyCommentAlert = () => {
        setShowEmptyCommentAlert(false);
    }

    return (
        <DetailsHeaderPage
            title="Report Details"
            backButtonAction={() => setSelectedReport(null)}
        >
            <ScrollView className="flex-1 px-6 pt-6">
                <View className="max-w-2xl w-full mx-auto">
                    {/* Header Card */}
                    <View className="bg-gray-800 rounded-xl p-6 mb-6">
                        <View className="flex-row items-center mb-4">
                            <View className="bg-jarvisPrimary rounded-full p-3 mr-4">
                                <IconContainer 
                                    iconProps={{
                                        name: 'file-document',
                                        size: 32,
                                        color: '#000',
                                        type: IconType.MaterialCommunityIcons
                                    }} 
                                />
                            </View>
                            <View className="flex-1">
                                <Text className="text-gray-400 text-sm">Report Type</Text>
                                <Text className="text-white text-2xl font-bold">{selectedReport.type}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Details Card */}
                    <View className="bg-gray-800 rounded-xl p-6 mb-6">
                        <Text className="text-white text-xl font-bold mb-6">Report Information</Text>

                        {/* Report Type Field (Read-only) */}
                        <View className="mb-6">
                            <Text className="text-gray-400 text-sm mb-2">Report Type</Text>
                            <View className="px-4 py-3">
                                <Text className="text-white text-base">{selectedReport.type}</Text>
                            </View>
                        </View>

                        {/* Description Field */}
                        <View className="mb-6">
                            <Text className="text-gray-400 text-sm mb-2">Description</Text>
                            {inEditMode ? (
                                <TextInput
                                    className="bg-gray-700 text-white rounded-lg px-4 py-3 text-base"
                                    value={currentReportDescription}
                                    onChangeText={setCurrentReportDescription}
                                    placeholderTextColor="#9CA3AF"
                                    placeholder="Enter report description..."
                                    multiline
                                    numberOfLines={4}
                                    textAlignVertical="top"
                                />
                            ) : (
                                <View className="px-4 py-3">
                                    <Text className="text-white text-base">
                                        {currentReportDescription || 'No description provided'}
                                    </Text>
                                </View>
                            )}
                        </View>

                        {/* Assigned Student Field */}
                        <View className="mb-6">
                            <Text className="text-gray-400 text-sm mb-2">Assigned Student</Text>
                            <View className="px-4 py-3">
                                <Text className="text-white text-base">
                                    {assignedStudent ? assignedStudent.name : 'None'}
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Comments Section */}
                    <View className="bg-gray-800 rounded-xl p-6 mb-6">
                        <Text className="text-white text-xl font-bold mb-4">Comments</Text>

                        {/* Comments List */}
                        <View className="mb-4">
                            <CommentList comments={reportComments} />
                        </View>

                        {/* Add Comment Input */}
                        <View>
                            <Text className="text-gray-400 text-sm mb-2">Add a comment</Text>
                            <TextInput
                                className="bg-gray-700 text-white rounded-lg px-4 py-3 text-base mb-3"
                                value={newCommentText}
                                onChangeText={setNewCommentText}
                                placeholder="Enter your comment..."
                                placeholderTextColor="#9CA3AF"
                                multiline
                                numberOfLines={3}
                                textAlignVertical="top"
                            />
                            <BaseButton
                                title="Add Comment"
                                className="bg-jarvisPrimary rounded-lg items-center active:opacity-70"
                                textClassName="text-black text-base font-semibold"
                                onPress={addCommentPressed}
                            />
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

            {/* Empty Comment Alert Modal */}
            <AlertModal
                isVisible={showEmptyCommentAlert}
                title="Empty Comment"
                message="Please enter text into the comment field before adding a comment."
                onConfirm={closeEmptyCommentAlert}
            />
        </DetailsHeaderPage>
    )
}

export default ReportDetailsPage;