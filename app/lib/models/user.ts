
export interface User {
    id: number;
    email: string;
    password: string;
    accountType: 'Master' | 'Admin' | 'Teacher';
    token: string;
    schoolId: number;
    requiresPasswordReset: boolean;
    fullName: string | null;
}

export interface SignUpRequest {
    email: string;
    password: string;
    schoolName: string;
}

export interface SignUpResponse {
    user: User;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    user: User;
    requiresPasswordReset: boolean;
}

export interface ChangePasswordRequest {
    oldPassword: string;
    newPassword: string;
}

export interface BatchUserInput {
    email: string;
    fullName: string;
    accountType: 'Master' | 'Admin' | 'Teacher' | 'Student';
}

export interface CreateUsersBatchRequest {
    users: BatchUserInput[];
}

export interface BatchUserResult {
    success: boolean;
    email: string;
    message: string;
    temporaryPassword?: string;
}

export interface CreateUsersBatchResponse {
    results: BatchUserResult[];
}
