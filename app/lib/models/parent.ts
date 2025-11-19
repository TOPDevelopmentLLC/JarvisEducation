

export interface Parent {
    parentId: string;
    name: string;
}

export interface ApiParent {
    id: number;
    name: string;
}

export type GetParentsResponse = ApiParent[];

export interface CreateParentRequest {
    name: string;
}

export interface CreateParentResponse {
    id: number;
    name: string;
}
