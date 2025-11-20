

export interface Student {
    studentId: string;
    name: string;
    reportIds?: string[];
}

export interface ApiStudent {
    id: number;
    name: string;
}

export type GetStudentsResponse = ApiStudent[];

export interface CreateStudentRequest {
    name: string;
}

export interface CreateStudentResponse {
    id: number;
    name: string;
}

export interface DeleteStudentResponse {
    message: string;
}