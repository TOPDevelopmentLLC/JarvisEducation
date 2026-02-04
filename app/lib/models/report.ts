import { Comment } from "./comment";

export interface Report {
    reportId: string;
    type: ReportType;
    description?: string;
    studentId?: string;
    comments?: Comment[];
    reportedById: string;
    reportedByName: string;
    attitude?: string;
    socialization?: string;
    antecedents?: string[];
    behaviors?: string[];
    consequences?: string[];
}

export enum ReportType {
    ABC = "ABC",
    Attendance = "Attendance",
    Behavior = "Behavior",
    CheckIn = "Check-in",
    Conflict = "Conflict",
    Expelled = "Expelled",
    Mood = "Mood",
    Secluded = "Secluded",
    SIP = "SIP"
}

export enum MoodType {
    Green = "Green - All is good.",
    Blue = "Blue - Feeling a little bit off.",
    Yellow = "Yellow - Can't sit still.",
    Red = "Red - Something is bothering me."
}

export const ABC_ANTECEDENTS = [
    "Given a task or instruction",
    "Told to stop a preferred activity",
    "Transition between activities",
    "Change in routine or schedule",
    "Waiting or downtime",
    "Peer conflict or teasing",
    "Denied a request",
    "Corrected or redirected by staff",
    "Left alone or ignored",
    "Crowded or noisy environment",
    "Arrival at school",
    "Hunger or fatigue",
    "Sensory overload",
    "Lack of attention",
    "Unfamiliar person or substitute teacher"
] as const;

export const ABC_BEHAVIORS = [
    "Verbal outburst",
    "Physical aggression",
    "Property destruction",
    "Elopement",
    "Non-compliance or refusal",
    "Self-injurious behavior",
    "Withdrawal or shutting down",
    "Repetitive or stereotypic behavior",
    "Inappropriate language",
    "Dropping to the floor"
] as const;

export const ABC_CONSEQUENCES = [
    "Verbal redirection",
    "Physical prompt or escort",
    "Planned ignoring",
    "Removal from the environment",
    "Offered a break or choice",
    "Sensory tool or calming strategy provided",
    "Peer attention",
    "Got out of the task",
    "Obtained a desired item or activity",
    "Lost access to a preferred item or activity",
    "Sent to office or parent contacted"
] as const;

export interface ApiReport {
    id: number;
    reportType: string;
    description: string;
    moodType: string | null;
    reportedByName: string;
    reportedById: number;
}

export interface GetReportsResponse {
    reports: ApiReport[];
}

export interface CreateReportRequest {
    reportType: string;
    description: string;
    moodType?: string | null;
    reportedByName: string;
    reportedById: number;
    studentId: number;
}

export interface CreateReportResponse {
    report: ApiReport;
}