

export interface Report {
    reportId: string;
    type: ReportType;
    description?: string;
    studentId?: string;
}

export enum ReportType {
    Attendance = "Attendance",
    Behavior = "Behavior",
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