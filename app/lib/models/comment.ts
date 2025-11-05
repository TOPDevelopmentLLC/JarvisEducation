

export interface Comment {
    commentId: string;
    userId: string; // ID of the user who created the comment
    fullName: string;
    bodyText: string;
    timestamp: Date;
    reportId: string;
}
