

export interface Account {
    email: string;
    accountType: AccountType;
}

export enum AccountType {
    STUDENT = 'Student', 
    PARENT = 'Parent', 
    TEACHER = 'Teacher', 
    ADMIN = 'Admin'
}