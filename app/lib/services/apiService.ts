import axios, { AxiosInstance, AxiosError } from 'axios';
import { SignUpRequest, SignUpResponse, LoginRequest, LoginResponse, ChangePasswordRequest, CreateUsersBatchRequest, CreateUsersBatchResponse } from 'lib/models/user';
import { GetTeamsResponse, GetTeamResponse, CreateTeamRequest, CreateTeamResponse, UpdateTeamRequest, UpdateTeamResponse, DeleteTeamResponse } from 'lib/models/team';
import { GetCodesResponse, GetCodeResponse, CreateCodeRequest, CreateCodeResponse, UpdateCodeRequest, UpdateCodeResponse, DeleteCodeResponse } from 'lib/models/code';
import { GetCommentsResponse, CreateCommentRequest, CreateCommentResponse, UpdateCommentRequest, UpdateCommentResponse } from 'lib/models/comment';
import { GetStudentsResponse, CreateStudentRequest, CreateStudentResponse } from 'lib/models/student';
import { GetTeachersResponse, CreateTeacherRequest, CreateTeacherResponse } from 'lib/models/teacher';
import { GetParentsResponse, CreateParentRequest, CreateParentResponse } from 'lib/models/parent';
import { GetAdministratorsResponse, CreateAdministratorRequest, CreateAdministratorResponse, DeleteAdministratorResponse } from 'lib/models/administrator';
import { GetClassCatalogueResponse, CreateCourseRequest, CreateCourseResponse } from 'lib/models/course';

class ApiService {
    private api: AxiosInstance;
    private baseURL: string;

    constructor() {
        // TODO: Move this to environment configuration
        this.baseURL = 'https://api.jarviseducation.app';

        this.api = axios.create({
            baseURL: this.baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: 10000, // 10 seconds timeout
        });

        // Request interceptor - can be used to add auth tokens to requests
        this.api.interceptors.request.use(
            (config) => {
                // Add auth token if available
                // const token = getStoredToken(); // TODO: Implement token storage
                // if (token) {
                //     config.headers.Authorization = `Bearer ${token}`;
                // }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Response interceptor - can be used to handle errors globally
        this.api.interceptors.response.use(
            (response) => {
                return response;
            },
            (error: AxiosError) => {
                // Handle common errors here
                if (error.response) {
                    // Server responded with error status
                    console.error('API Error:', error.response.status, error.response.data);
                } else if (error.request) {
                    // Request was made but no response received
                    console.error('Network Error:', error.message);
                } else {
                    // Something else happened
                    console.error('Error:', error.message);
                }
                return Promise.reject(error);
            }
        );
    }

    /**
     * Sign up a new user
     * @param data - Sign up request data containing email, password, and schoolName
     * @returns Promise with the sign up response containing user data
     */
    async signUp(data: SignUpRequest): Promise<SignUpResponse> {
        try {
            const response = await this.api.post<SignUpResponse>('/auth/signup', data);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Sign up failed');
            }
            throw error;
        }
    }

    /**
     * Log in an existing user
     * @param data - Login request data containing email and password
     * @returns Promise with the login response containing user data and password reset flag
     */
    async login(data: LoginRequest): Promise<LoginResponse> {
        try {
            const response = await this.api.post<LoginResponse>('/auth/login', data);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Login failed');
            }
            throw error;
        }
    }

    /**
     * Change user password
     * @param data - Change password request data containing old and new passwords
     * @param token - JWT token for authorization
     * @returns Promise that resolves when password is changed successfully
     */
    async changePassword(data: ChangePasswordRequest, token: string): Promise<void> {
        try {
            await this.api.post('/auth/change-password', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Password change failed');
            }
            throw error;
        }
    }

    /**
     * Create multiple users in batch (Admin only)
     * @param data - Batch user creation request containing array of user data
     * @param token - JWT token for authorization (admin required)
     * @returns Promise with batch creation results including temporary passwords
     */
    async createUsersBatch(data: CreateUsersBatchRequest, token: string): Promise<CreateUsersBatchResponse> {
        try {
            const response = await this.api.post<CreateUsersBatchResponse>('/auth/admin/create-users-batch', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Batch user creation failed');
            }
            throw error;
        }
    }

    /**
     * Get all teams for the authenticated user
     * @param token - JWT token for authorization
     * @returns Promise with array of teams
     */
    async getTeams(token: string): Promise<GetTeamsResponse> {
        try {
            const response = await this.api.get<GetTeamsResponse>('/api/teams', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to fetch teams');
            }
            throw error;
        }
    }

    /**
     * Get a specific team by ID
     * @param teamId - The ID of the team to fetch
     * @param token - JWT token for authorization
     * @returns Promise with the team data
     */
    async getTeam(teamId: string, token: string): Promise<GetTeamResponse> {
        try {
            const response = await this.api.get<GetTeamResponse>(`/api/teams/${teamId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to fetch team');
            }
            throw error;
        }
    }

    /**
     * Get all teams for a specific user
     * @param userId - The ID of the user whose teams to fetch
     * @param token - JWT token for authorization
     * @returns Promise with array of teams for the user
     */
    async getTeamsByUser(userId: string, token: string): Promise<GetTeamsResponse> {
        try {
            const response = await this.api.get<GetTeamsResponse>(`/api/teams/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to fetch user teams');
            }
            throw error;
        }
    }

    /**
     * Create a new team
     * @param data - Team creation request data
     * @param token - JWT token for authorization
     * @returns Promise with the created team data
     */
    async createTeam(data: CreateTeamRequest, token: string): Promise<CreateTeamResponse> {
        try {
            const response = await this.api.post<CreateTeamResponse>('/api/teams', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to create team');
            }
            throw error;
        }
    }

    /**
     * Update an existing team
     * @param teamId - The ID of the team to update
     * @param data - Team update request data
     * @param token - JWT token for authorization
     * @returns Promise with the updated team data
     */
    async updateTeam(teamId: string, data: UpdateTeamRequest, token: string): Promise<UpdateTeamResponse> {
        try {
            const response = await this.api.put<UpdateTeamResponse>(`/api/teams/${teamId}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to update team');
            }
            throw error;
        }
    }

    /**
     * Delete a team
     * @param teamId - The ID of the team to delete
     * @param token - JWT token for authorization
     * @returns Promise with the deletion confirmation message
     */
    async deleteTeam(teamId: string, token: string): Promise<DeleteTeamResponse> {
        try {
            const response = await this.api.delete<DeleteTeamResponse>(`/api/teams/${teamId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to delete team');
            }
            throw error;
        }
    }

    /**
     * Get all codes
     * @param token - JWT token for authorization
     * @returns Promise with array of codes
     */
    async getCodes(token: string): Promise<GetCodesResponse> {
        try {
            const response = await this.api.get<GetCodesResponse>('/api/codes', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to fetch codes');
            }
            throw error;
        }
    }

    /**
     * Get a specific code by ID
     * @param codeId - The ID of the code to fetch
     * @param token - JWT token for authorization
     * @returns Promise with the code data
     */
    async getCode(codeId: string, token: string): Promise<GetCodeResponse> {
        try {
            const response = await this.api.get<GetCodeResponse>(`/api/codes/${codeId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to fetch code');
            }
            throw error;
        }
    }

    /**
     * Create a new code
     * @param data - Code creation request data
     * @param token - JWT token for authorization
     * @returns Promise with the created code data
     */
    async createCode(data: CreateCodeRequest, token: string): Promise<CreateCodeResponse> {
        try {
            const response = await this.api.post<CreateCodeResponse>('/api/codes', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to create code');
            }
            throw error;
        }
    }

    /**
     * Update an existing code
     * @param codeId - The ID of the code to update
     * @param data - Code update request data
     * @param token - JWT token for authorization
     * @returns Promise with the updated code data
     */
    async updateCode(codeId: string, data: UpdateCodeRequest, token: string): Promise<UpdateCodeResponse> {
        try {
            const response = await this.api.put<UpdateCodeResponse>(`/api/codes/${codeId}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to update code');
            }
            throw error;
        }
    }

    /**
     * Delete a code
     * @param codeId - The ID of the code to delete
     * @param token - JWT token for authorization
     * @returns Promise with the deletion confirmation message
     */
    async deleteCode(codeId: string, token: string): Promise<DeleteCodeResponse> {
        try {
            const response = await this.api.delete<DeleteCodeResponse>(`/api/codes/${codeId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to delete code');
            }
            throw error;
        }
    }

    /**
     * Get all comments for a specific report
     * @param reportId - The ID of the report to fetch comments for
     * @param token - JWT token for authorization
     * @returns Promise with array of comments
     */
    async getReportComments(reportId: string, token: string): Promise<GetCommentsResponse> {
        try {
            const response = await this.api.get<GetCommentsResponse>(`/api/reports/${reportId}/comments`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to fetch comments');
            }
            throw error;
        }
    }

    /**
     * Create a new comment on a report
     * @param reportId - The ID of the report to add a comment to
     * @param data - Comment creation request data
     * @param token - JWT token for authorization
     * @returns Promise with the created comment data
     */
    async createReportComment(reportId: string, data: CreateCommentRequest, token: string): Promise<CreateCommentResponse> {
        try {
            const response = await this.api.post<CreateCommentResponse>(`/api/reports/${reportId}/comments`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to create comment');
            }
            throw error;
        }
    }

    /**
     * Update an existing comment on a report
     * @param reportId - The ID of the report containing the comment
     * @param commentId - The ID of the comment to update
     * @param data - Comment update request data
     * @param token - JWT token for authorization
     * @returns Promise with the updated comment data
     */
    async updateReportComment(reportId: string, commentId: string, data: UpdateCommentRequest, token: string): Promise<UpdateCommentResponse> {
        try {
            const response = await this.api.put<UpdateCommentResponse>(`/api/reports/${reportId}/comments/${commentId}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to update comment');
            }
            throw error;
        }
    }

    /**
     * Get all students
     * @param token - JWT token for authorization
     * @returns Promise with array of students
     */
    async getStudents(token: string): Promise<GetStudentsResponse> {
        try {
            const response = await this.api.get<GetStudentsResponse>('/students', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to fetch students');
            }
            throw error;
        }
    }

    /**
     * Create a new student
     * @param data - Student creation request data
     * @param token - JWT token for authorization
     * @returns Promise with the created student data
     */
    async createStudent(data: CreateStudentRequest, token: string): Promise<CreateStudentResponse> {
        try {
            const response = await this.api.post<CreateStudentResponse>('/students', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to create student');
            }
            throw error;
        }
    }

    /**
     * Get all teachers
     * @param token - JWT token for authorization
     * @returns Promise with array of teachers
     */
    async getTeachers(token: string): Promise<GetTeachersResponse> {
        try {
            const response = await this.api.get<GetTeachersResponse>('/teachers', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to fetch teachers');
            }
            throw error;
        }
    }

    /**
     * Create a new teacher
     * @param data - Teacher creation request data
     * @param token - JWT token for authorization
     * @returns Promise with the created teacher data
     */
    async createTeacher(data: CreateTeacherRequest, token: string): Promise<CreateTeacherResponse> {
        try {
            const response = await this.api.post<CreateTeacherResponse>('/teachers', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to create teacher');
            }
            throw error;
        }
    }

    /**
     * Get all parents
     * @param token - JWT token for authorization
     * @returns Promise with array of parents
     */
    async getParents(token: string): Promise<GetParentsResponse> {
        try {
            const response = await this.api.get<GetParentsResponse>('/parents', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to fetch parents');
            }
            throw error;
        }
    }

    /**
     * Create a new parent
     * @param data - Parent creation request data
     * @param token - JWT token for authorization
     * @returns Promise with the created parent data
     */
    async createParent(data: CreateParentRequest, token: string): Promise<CreateParentResponse> {
        try {
            const response = await this.api.post<CreateParentResponse>('/parents', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to create parent');
            }
            throw error;
        }
    }

    /**
     * Get all administrators
     * @param token - JWT token for authorization
     * @returns Promise with array of administrators
     */
    async getAdministrators(token: string): Promise<GetAdministratorsResponse> {
        try {
            const response = await this.api.get<GetAdministratorsResponse>('/administrators', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to fetch administrators');
            }
            throw error;
        }
    }

    /**
     * Create a new administrator
     * @param data - Administrator creation request data
     * @param token - JWT token for authorization
     * @returns Promise with the created administrator data
     */
    async createAdministrator(data: CreateAdministratorRequest, token: string): Promise<CreateAdministratorResponse> {
        try {
            const response = await this.api.post<CreateAdministratorResponse>('/administrators', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to create administrator');
            }
            throw error;
        }
    }

    /**
     * Delete an administrator
     * @param administratorId - The ID of the administrator to delete
     * @param token - JWT token for authorization
     * @returns Promise with the deletion confirmation message
     */
    async deleteAdministrator(administratorId: string, token: string): Promise<DeleteAdministratorResponse> {
        try {
            const response = await this.api.delete<DeleteAdministratorResponse>(`/administrator/${administratorId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to delete administrator');
            }
            throw error;
        }
    }

    /**
     * Get class catalogue
     * @param token - JWT token for authorization
     * @returns Promise with array of courses
     */
    async getClassCatalogue(token: string): Promise<GetClassCatalogueResponse> {
        try {
            const response = await this.api.get<GetClassCatalogueResponse>('/classcatalogue', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to fetch class catalogue');
            }
            throw error;
        }
    }

    /**
     * Create a new course in the class catalogue
     * @param data - Course creation request data
     * @param token - JWT token for authorization
     * @returns Promise with the created course data
     */
    async createCourse(data: CreateCourseRequest, token: string): Promise<CreateCourseResponse> {
        try {
            const response = await this.api.post<CreateCourseResponse>('/classcatalogue', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to create course');
            }
            throw error;
        }
    }

    // TODO: Add more API methods here as needed
    // Examples:
    // async getReports(): Promise<Report[]> { }
    // async createReport(report: Report): Promise<Report> { }
}

// Export a singleton instance
export const apiService = new ApiService();
export default apiService;
