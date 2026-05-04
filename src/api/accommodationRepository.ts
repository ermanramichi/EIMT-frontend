import axiosInstance from './axiosInstance';
import { Accommodation, Page } from '../types';

const AccommodationRepository = {
    findAll: async (page: number = 0, size: number = 10): Promise<Page<Accommodation>> => {
        const response = await axiosInstance.get<Page<Accommodation>>('/accommodations', {
            params: { page, size },
        });
        return response.data;
    },

    findById: async (id: number): Promise<Accommodation> => {
        const response = await axiosInstance.get<Accommodation>(`/accommodations/${id}`);
        return response.data;
    },
};

export default AccommodationRepository;
