

export interface Team {
    teamId: string;
    name: string;
    description: string;
    memberIds: string[]; // Contains both teacher and admin IDs
    assignedCodeIds: string[];
}
