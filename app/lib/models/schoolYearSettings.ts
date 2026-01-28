export interface Term {
    id: number;
    name: string;
    termNumber: number;
    startDate: string;
    endDate: string;
}

export interface Holiday {
    id: number;
    name: string;
    date: string;
    description: string;
}

export interface BreakPeriod {
    id: number;
    name: string;
    breakType: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface SchedulePeriod {
    id: number;
    name: string;
    periodNumber: number;
    periodType: string;
    startTime: string;
    endTime: string;
}

export interface SchoolYearSettings {
    id: number;
    name: string;
    startDate: string | null;
    endDate: string | null;
    termType: string;
    schoolDayStart: string | null;
    schoolDayEnd: string | null;
    timezone: string;
    isActive: boolean;
    terms: Term[];
    holidays: Holiday[];
    breakPeriods: BreakPeriod[];
    schedulePeriods: SchedulePeriod[];
}

export interface GetHistoricalSettingsResponse {
    settings: SchoolYearSettings[];
}

export interface GetActiveSettingsResponse {
    settings: SchoolYearSettings;
}

export interface UpdateSettingsRequest {
    name: string;
    startDate: string;
    endDate: string;
    termType: string;
    schoolDayStart: string;
    schoolDayEnd: string;
    timezone: string;
}

export interface UpdateSettingsResponse {
    settings: SchoolYearSettings;
}

export interface CreateTermRequest {
    name: string;
    termNumber: number;
    startDate: string;
    endDate: string;
}

export interface CreateTermResponse {
    settings: SchoolYearSettings;
}

export interface DeleteTermResponse {
    message: string;
}
