import { View, Text, ScrollView, ViewStyle } from "react-native";
import { Comment } from "lib/models/comment";
import CommentListItem from "./CommentListItem";
import clsx from "clsx";

export interface CommentListProps {
    comments: Comment[];
    className?: string;
    style?: ViewStyle;
    emptyText?: string;
    currentUserId?: string;
    onEditComment?: (comment: Comment) => void;
}

const CommentList = ({
    comments,
    className,
    style,
    emptyText = "No comments yet",
    currentUserId,
    onEditComment
}: CommentListProps) => {
    if (comments.length === 0) {
        return (
            <View className="py-8">
                <Text className="text-gray-400 text-center text-base">{emptyText}</Text>
            </View>
        );
    }

    return (
        <ScrollView
            className={clsx('max-h-96', className)}
            style={style}
            showsVerticalScrollIndicator={true}
        >
            {comments.map((comment) => (
                <CommentListItem
                    key={comment.commentId}
                    comment={comment}
                    currentUserId={currentUserId}
                    onEdit={onEditComment}
                />
            ))}
        </ScrollView>
    );
};

export default CommentList;
