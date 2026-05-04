import axiosInstance from './axiosInstance';
import { Host } from '../types';

const HostRepository = {
    findAll: async (): Promise<Host[]> => {
        const response = await axiosInstance.get<Host[]>('/hosts');
        return response.data;
    },

    findById: async (id: number): Promise<Host> => {
        const response = await axiosInstance.get<Host>(`/hosts/${id}`);
        return response.data;
    },
};

export default HostRepository;
