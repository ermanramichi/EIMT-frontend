import axiosInstance from './axiosInstance';
import { Host, HostPayload } from '../types';

const HostRepository = {
    findAll: async (): Promise<Host[]> => {
        const response = await axiosInstance.get<Host[]>('/hosts');
        return response.data;
    },

    findById: async (id: number): Promise<Host> => {
        const response = await axiosInstance.get<Host>(`/hosts/${id}`);
        return response.data;
    },

    create: async (payload: HostPayload): Promise<Host> => {
        const response = await axiosInstance.post<Host>('/hosts/add', payload);
        return response.data;
    },

    update: async (id: number, payload: HostPayload): Promise<Host> => {
        const response = await axiosInstance.put<Host>(`/hosts/edit/${id}`, payload);
        return response.data;
    },

    remove: async (id: number): Promise<void> => {
        await axiosInstance.delete(`/hosts/delete/${id}`);
    },
};

export default HostRepository;
