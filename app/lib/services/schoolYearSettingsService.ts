import axios, { AxiosInstance } from 'axios';
import { GetHistoricalSettingsResponse, GetActiveSettingsResponse, UpdateSettingsRequest, UpdateSettingsResponse, CreateTermRequest, CreateTermResponse, DeleteTermResponse, CreateHolidayRequest, CreateHolidayResponse, DeleteHolidayResponse, CreateBreakPeriodRequest, CreateBreakPeriodResponse, DeleteBreakPeriodResponse, CreateSchedulePeriodRequest, CreateSchedulePeriodResponse, DeleteSchedulePeriodResponse } from 'lib/models/schoolYearSettings';

class SchoolYearSettingsService {
    private api: AxiosInstance;
    private baseURL: string;

    constructor() {
        this.baseURL = 'https://api.jarviseducation.app';

        this.api = axios.create({
            baseURL: this.baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: 10000,
        });
    }

    /**
     * Get historical school year settings
     * @param token - JWT token for authorization
     * @returns Promise with array of historical school year settings
     */
    async getHistoricalSettings(token: string): Promise<GetHistoricalSettingsResponse> {
        try {
            const response = await this.api.get<GetHistoricalSettingsResponse>('/api/school-year-settings/historical', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to fetch historical settings');
            }
            throw error;
        }
    }

    /**
     * Get active school year settings
     * @param token - JWT token for authorization
     * @returns Promise with the active school year settings
     */
    async getActiveSettings(token: string): Promise<GetActiveSettingsResponse> {
        try {
            const response = await this.api.get<GetActiveSettingsResponse>('/api/school-year-settings/active', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to fetch active settings');
            }
            throw error;
        }
    }

    /**
     * Update school year settings
     * @param data - Settings update request data
     * @param token - JWT token for authorization
     * @returns Promise with the updated school year settings
     */
    async updateSettings(data: UpdateSettingsRequest, token: string): Promise<UpdateSettingsResponse> {
        try {
            const response = await this.api.put<UpdateSettingsResponse>('/api/school-year-settings', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to update settings');
            }
            throw error;
        }
    }

    /**
     * Add a term to the active school year
     * @param data - Term creation request data
     * @param token - JWT token for authorization
     * @returns Promise with the updated school year settings
     */
    async createTerm(data: CreateTermRequest, token: string): Promise<CreateTermResponse> {
        try {
            const response = await this.api.post<CreateTermResponse>('/api/school-year-settings/terms', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to create term');
            }
            throw error;
        }
    }

    /**
     * Remove a term from the active school year
     * @param termId - The ID of the term to remove
     * @param token - JWT token for authorization
     * @returns Promise with the deletion confirmation message
     */
    async deleteTerm(termId: number, token: string): Promise<DeleteTermResponse> {
        try {
            const response = await this.api.delete<DeleteTermResponse>(`/api/school-year-settings/terms/${termId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to delete term');
            }
            throw error;
        }
    }

    /**
     * Add a holiday to the active school year
     * @param data - Holiday creation request data
     * @param token - JWT token for authorization
     * @returns Promise with the updated school year settings
     */
    async createHoliday(data: CreateHolidayRequest, token: string): Promise<CreateHolidayResponse> {
        try {
            const response = await this.api.post<CreateHolidayResponse>('/api/school-year-settings/holidays', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to create holiday');
            }
            throw error;
        }
    }

    /**
     * Remove a holiday from the active school year
     * @param holidayId - The ID of the holiday to remove
     * @param token - JWT token for authorization
     * @returns Promise with the deletion confirmation message
     */
    async deleteHoliday(holidayId: number, token: string): Promise<DeleteHolidayResponse> {
        try {
            const response = await this.api.delete<DeleteHolidayResponse>(`/api/school-year-settings/holidays/${holidayId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to delete holiday');
            }
            throw error;
        }
    }

    /**
     * Add a break period to the active school year
     * @param data - Break period creation request data
     * @param token - JWT token for authorization
     * @returns Promise with the updated school year settings
     */
    async createBreakPeriod(data: CreateBreakPeriodRequest, token: string): Promise<CreateBreakPeriodResponse> {
        try {
            const response = await this.api.post<CreateBreakPeriodResponse>('/api/school-year-settings/breaks', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to create break period');
            }
            throw error;
        }
    }

    /**
     * Remove a break period from the active school year
     * @param breakId - The ID of the break period to remove
     * @param token - JWT token for authorization
     * @returns Promise with the deletion confirmation message
     */
    async deleteBreakPeriod(breakId: number, token: string): Promise<DeleteBreakPeriodResponse> {
        try {
            const response = await this.api.delete<DeleteBreakPeriodResponse>(`/api/school-year-settings/breaks/${breakId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to delete break period');
            }
            throw error;
        }
    }

    /**
     * Add a schedule period to the active school year
     * @param data - Schedule period creation request data
     * @param token - JWT token for authorization
     * @returns Promise with the updated school year settings
     */
    async createSchedulePeriod(data: CreateSchedulePeriodRequest, token: string): Promise<CreateSchedulePeriodResponse> {
        try {
            const response = await this.api.post<CreateSchedulePeriodResponse>('/api/school-year-settings/periods', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to create schedule period');
            }
            throw error;
        }
    }

    /**
     * Remove a schedule period from the active school year
     * @param periodId - The ID of the schedule period to remove
     * @param token - JWT token for authorization
     * @returns Promise with the deletion confirmation message
     */
    async deleteSchedulePeriod(periodId: number, token: string): Promise<DeleteSchedulePeriodResponse> {
        try {
            const response = await this.api.delete<DeleteSchedulePeriodResponse>(`/api/school-year-settings/periods/${periodId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to delete schedule period');
            }
            throw error;
        }
    }
}

export const schoolYearSettingsService = new SchoolYearSettingsService();
export default schoolYearSettingsService;
