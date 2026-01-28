export interface PointsSystem {
    attendanceDeduction: number;
    behaviorDeduction: number;
    conflictDeduction: number;
    expelledDeduction: number;
    moodDeduction: number;
    secludedDeduction: number;
    sipDeduction: number;
    dailyIncrease: number;
}

export interface GetPointsSystemResponse {
    pointsSystem: PointsSystem;
}

export interface UpdatePointsSystemRequest {
    attendanceDeduction?: number;
    behaviorDeduction?: number;
    conflictDeduction?: number;
    expelledDeduction?: number;
    moodDeduction?: number;
    secludedDeduction?: number;
    sipDeduction?: number;
    dailyIncrease?: number;
}

export interface UpdatePointsSystemResponse {
    pointsSystem: PointsSystem;
}
