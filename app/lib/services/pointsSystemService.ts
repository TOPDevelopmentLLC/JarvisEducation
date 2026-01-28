import axios, { AxiosInstance } from 'axios';
import { GetPointsSystemResponse, UpdatePointsSystemRequest, UpdatePointsSystemResponse } from 'lib/models/pointsSystem';

class PointsSystemService {
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
     * Get the current points system configuration
     * @param token - JWT token for authorization
     * @returns Promise with the points system configuration
     */
    async getPointsSystem(token: string): Promise<GetPointsSystemResponse> {
        try {
            const response = await this.api.get<GetPointsSystemResponse>('/api/points-system', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to fetch points system');
            }
            throw error;
        }
    }

    /**
     * Update the points system configuration
     * @param data - Points system update request data (all fields optional)
     * @param token - JWT token for authorization
     * @returns Promise with the updated points system configuration
     */
    async updatePointsSystem(data: UpdatePointsSystemRequest, token: string): Promise<UpdatePointsSystemResponse> {
        try {
            const response = await this.api.put<UpdatePointsSystemResponse>('/api/points-system', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to update points system');
            }
            throw error;
        }
    }
}

export const pointsSystemService = new PointsSystemService();
export default pointsSystemService;
