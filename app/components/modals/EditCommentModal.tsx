import { IconType } from "components/IconContainer";
import JarvisPaperTextInput from "components/JarvisPaperTextInput";
import JarvisModal from "components/modals/JarvisModal";
import { useState, useEffect } from "react";
import { Comment } from "lib/models/comment";


export interface EditCommentModalProps {
    isVisible: boolean;
    onDismiss?: () => void;
    comment: Comment | null;
    onSave: (commentId: string, newBodyText: string) => void;
}

const EditCommentModal = ({
    isVisible,
    onDismiss,
    comment,
    onSave
}: EditCommentModalProps) => {
    const [commentText, setCommentText] = useState('');

    // Initialize form with comment data when modal opens
    useEffect(() => {
        if (comment) {
            setCommentText(comment.bodyText);
        }
    }, [comment]);

    const saveButtonPressed = () => {
        if (!comment) {
            return;
        }
        if (commentText.trim().length === 0) {
            return;
        }

        // Call the parent's save handler
        onSave(comment.commentId, commentText.trim());

        // Close modal
        onDismiss?.();
    }

    return (
        <JarvisModal
            headerProps={{
                title: 'Edit Comment',
                icon: {
                    type: IconType.MaterialCommunityIcons,
                    name: 'comment-edit',
                    color: '#000000',
                    size: 32
                }
            }}
            isVisible={isVisible}
            onDismiss={onDismiss}
            confirmButtonProps={{
                title: "Save",
                onPress: saveButtonPressed
            }}>
                <JarvisPaperTextInput
                    placeholder={"Comment text"}
                    defaultValue={commentText}
                    onTextChange={(text) => setCommentText(text)}
                    multiline={true}
                    numberOfLines={4}
                />
        </JarvisModal>
    )
}

export default EditCommentModal;
