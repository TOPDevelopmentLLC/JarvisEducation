

export interface Administrator {
    adminId: string;
    name: string;
    teamIds?: string[];
}

export interface ApiAdministrator {
    id: number;
    name: string;
}

export type GetAdministratorsResponse = ApiAdministrator[];

export interface CreateAdministratorRequest {
    name: string;
}

export interface CreateAdministratorResponse {
    id: number;
    name: string;
}

export interface DeleteAdministratorResponse {
    message: string;
}