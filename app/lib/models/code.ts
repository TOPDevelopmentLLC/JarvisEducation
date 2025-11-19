export interface Code {
    codeId: string;
    name: string;
    description: string;
    title?: string;
    content?: string;
    language?: string;
}

export interface GetCodesResponse {
    codes: Code[];
}

export interface GetCodeResponse {
    code: Code;
}

export interface CreateCodeRequest {
    title: string;
    content: string;
    language: string;
}

export interface CreateCodeResponse {
    code: Code;
}

export interface UpdateCodeRequest {
    title?: string;
    content?: string;
    language?: string;
}

export interface UpdateCodeResponse {
    code: Code;
}

export interface DeleteCodeResponse {
    message: string;
}
