

export interface Teacher {
    teacherId: string;
    name: string;
    assignedCourseIds?: string[];
    teamIds?: string[];
}

export interface ApiTeacher {
    id: number;
    name: string;
}

export type GetTeachersResponse = ApiTeacher[];

export interface CreateTeacherRequest {
    name: string;
}

export interface CreateTeacherResponse {
    id: number;
    name: string;
}