import { useCallback, useEffect, useState } from 'react';
import { Country, CountryPayload } from '../types';
import CountryRepository from '../api/countryRepository';

export function useCountries() {
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCountries = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await CountryRepository.findAll();
            setCountries(result);
        } catch (err: any) {
            setError(err?.response?.data?.message || err.message || 'Failed to fetch countries');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCountries();
    }, [fetchCountries]);

    const create = useCallback(async (payload: CountryPayload) => {
        await CountryRepository.create(payload);
        await fetchCountries();
    }, [fetchCountries]);

    const update = useCallback(async (id: number, payload: CountryPayload) => {
        await CountryRepository.update(id, payload);
        await fetchCountries();
    }, [fetchCountries]);

    const remove = useCallback(async (id: number) => {
        await CountryRepository.remove(id);
        await fetchCountries();
    }, [fetchCountries]);

    return { countries, loading, error, refetch: fetchCountries, create, update, remove };
}

export function useCountry(id: number | undefined) {
    const [country, setCountry] = useState<Country | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id === undefined) return;
        setLoading(true);
        setError(null);
        CountryRepository.findById(id)
            .then(setCountry)
            .catch((err: any) =>
                setError(err?.response?.data?.message || err.message || 'Failed to fetch country'),
            )
            .finally(() => setLoading(false));
    }, [id]);

    return { country, loading, error };
}
