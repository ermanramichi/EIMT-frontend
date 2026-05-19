import { useCallback, useEffect, useState } from 'react';
import { Accommodation, AccommodationPayload, Page } from '../types';
import AccommodationRepository from '../api/accommodationRepository';

export function useAccommodations(page: number = 0, size: number = 10) {
    const [data, setData] = useState<Page<Accommodation> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAccommodations = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await AccommodationRepository.findAll(page, size);
            setData(result);
        } catch (err: any) {
            setError(err?.response?.data?.message || err.message || 'Failed to fetch accommodations');
        } finally {
            setLoading(false);
        }
    }, [page, size]);

    useEffect(() => {
        fetchAccommodations();
    }, [fetchAccommodations]);

    const create = useCallback(async (payload: AccommodationPayload) => {
        await AccommodationRepository.create(payload);
        await fetchAccommodations();
    }, [fetchAccommodations]);

    const update = useCallback(async (id: number, payload: AccommodationPayload) => {
        await AccommodationRepository.update(id, payload);
        await fetchAccommodations();
    }, [fetchAccommodations]);

    const remove = useCallback(async (id: number) => {
        await AccommodationRepository.remove(id);
        await fetchAccommodations();
    }, [fetchAccommodations]);

    return { data, loading, error, refetch: fetchAccommodations, create, update, remove };
}

export function useAccommodation(id: number | undefined) {
    const [accommodation, setAccommodation] = useState<Accommodation | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id === undefined) return;
        setLoading(true);
        setError(null);
        AccommodationRepository.findById(id)
            .then(setAccommodation)
            .catch((err: any) =>
                setError(err?.response?.data?.message || err.message || 'Failed to fetch accommodation'),
            )
            .finally(() => setLoading(false));
    }, [id]);

    return { accommodation, loading, error };
}
