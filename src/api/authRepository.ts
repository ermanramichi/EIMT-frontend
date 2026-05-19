import axiosInstance from './axiosInstance';
import { AuthResponse, LoginPayload, RegisterPayload } from '../types';

const AuthRepository = {
    login: async (payload: LoginPayload): Promise<AuthResponse> => {
        const response = await axiosInstance.post<AuthResponse>('/auth/login', payload);
        return response.data;
    },

    register: async (payload: RegisterPayload): Promise<AuthResponse> => {
        const response = await axiosInstance.post<AuthResponse>('/auth/register', payload);
        return response.data;
    },
};

export default AuthRepository;
