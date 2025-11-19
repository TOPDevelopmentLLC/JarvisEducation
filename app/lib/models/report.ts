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
}

export enum ReportType {
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
    moodType?: string;
    reportedByName: string;
    reportedById: number;
}

export interface CreateReportResponse {
    report: ApiReport;
}