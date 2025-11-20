

export interface Course {
    courseId: string;
    title: string;
    description: string;
    classroomNumber?: string;
    startTime?: string;
    endTime?: string;
    assignedTeacherId?: string;
}

export interface ApiCourse {
    id: number;
    courseName: string;
    courseDescription: string;
}

export type GetClassCatalogueResponse = ApiCourse[];

export interface CreateCourseRequest {
    courseName: string;
    courseDescription: string;
}

export interface CreateCourseResponse {
    id: number;
    courseName: string;
    courseDescription: string;
}

export interface DeleteCourseResponse {
    message: string;
}