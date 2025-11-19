

export interface Comment {
    commentId: string;
    userId: string; // ID of the user who created the comment
    fullName: string;
    bodyText: string;
    timestamp: Date;
    reportId: string;
}

export interface GetCommentsResponse {
    comments: Comment[];
}

export interface CreateCommentRequest {
    content: string;
    authorId: number;
}

export interface CreateCommentResponse {
    comment: Comment;
}

export interface UpdateCommentRequest {
    content: string;
}

export interface UpdateCommentResponse {
    comment: Comment;
}
