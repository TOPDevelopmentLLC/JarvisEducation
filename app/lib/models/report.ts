

export interface Report {
    type: ReportType;
    description?: string;
}

export enum ReportType {
    Attendance = "Attendance"
}