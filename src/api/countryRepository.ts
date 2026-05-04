import axiosInstance from './axiosInstance';
import { Country } from '../types';

const CountryRepository = {
    findAll: async (): Promise<Country[]> => {
        const response = await axiosInstance.get<Country[]>('/countries');
        return response.data;
    },

    findById: async (id: number): Promise<Country> => {
        const response = await axiosInstance.get<Country>(`/countries/${id}`);
        return response.data;
    },
};

export default CountryRepository;
