export interface Team {
    teamId: string;
    name: string;
    description: string;
    memberIds: string[]; // Contains both teacher and admin IDs in format "teacher:{id}" or "admin:{id}"
    assignedCodeIds: string[];
}

export interface GetTeamsResponse {
    teams: Team[];
}

export interface GetTeamResponse {
    team: Team;
}

export interface CreateTeamRequest {
    name: string;
    description: string;
    memberIds: number[];
    codeIds: number[];
}

export interface CreateTeamResponse {
    team: Team;
}

export interface UpdateTeamRequest {
    name?: string;
    description?: string;
    addMemberIds?: number[];
    removeMemberIds?: number[];
    addCodeIds?: number[];
    removeCodeIds?: number[];
}

export interface UpdateTeamResponse {
    team: Team;
}

export interface DeleteTeamResponse {
    message: string;
}
