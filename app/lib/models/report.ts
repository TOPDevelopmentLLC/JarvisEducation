

export interface Report {
    reportId: string;
    type: ReportType;
    description?: string;
}

export enum ReportType {
    Attendance = "Attendance"
}