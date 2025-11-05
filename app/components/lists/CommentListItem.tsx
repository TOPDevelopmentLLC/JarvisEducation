import { View, Text } from "react-native";
import { Comment } from "lib/models/comment";

export interface CommentListItemProps {
    comment: Comment;
}

const CommentListItem = ({ comment }: CommentListItemProps) => {
    const formatTimestamp = (date: Date) => {
        const dateObj = new Date(date);
        return dateObj.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    return (
        <View className="bg-gray-700 rounded-xl p-4 mb-3">
            <View className="flex-row justify-between items-start mb-2">
                <Text className="text-white text-base font-semibold">{comment.fullName}</Text>
                <Text className="text-gray-400 text-xs">{formatTimestamp(comment.timestamp)}</Text>
            </View>
            <Text className="text-gray-300 text-base">{comment.bodyText}</Text>
        </View>
    );
};

export default CommentListItem;
