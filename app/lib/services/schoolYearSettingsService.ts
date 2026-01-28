import axios, { AxiosInstance } from 'axios';
import { GetHistoricalSettingsResponse, GetActiveSettingsResponse, UpdateSettingsRequest, UpdateSettingsResponse } from 'lib/models/schoolYearSettings';

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
}

export const schoolYearSettingsService = new SchoolYearSettingsService();
export default schoolYearSettingsService;
