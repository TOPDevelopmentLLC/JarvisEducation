import { View, Text } from "react-native";
import { Comment } from "lib/models/comment";
import IconButton from "components/buttons/IconButton";
import { IconType } from "components/IconContainer";

export interface CommentListItemProps {
    comment: Comment;
    currentUserId?: string;
    onEdit?: (comment: Comment) => void;
}

const CommentListItem = ({ comment, currentUserId, onEdit }: CommentListItemProps) => {
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

    const isOwnedByCurrentUser = currentUserId && comment.userId === currentUserId;

    return (
        <View className="bg-gray-700 rounded-xl p-4 mb-3">
            <View className="flex-row justify-between items-start mb-2">
                <View className="flex-1">
                    <Text className="text-white text-base font-semibold">{comment.fullName}</Text>
                    <Text className="text-gray-400 text-xs mt-1">{formatTimestamp(comment.timestamp)}</Text>
                </View>
                {isOwnedByCurrentUser && onEdit && (
                    <IconButton
                        iconProps={{
                            name: 'pencil',
                            size: 20,
                            color: '#9CA3AF',
                            type: IconType.MaterialCommunityIcons
                        }}
                        onIconClicked={() => onEdit(comment)}
                    />
                )}
            </View>
            <Text className="text-gray-300 text-base">{comment.bodyText}</Text>
        </View>
    );
};

export default CommentListItem;
