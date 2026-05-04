import { useCallback, useEffect, useState } from 'react';
import { Country } from '../types';
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
            setError(err.message || 'Failed to fetch countries');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCountries();
    }, [fetchCountries]);

    return { countries, loading, error, refetch: fetchCountries };
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
            .catch((err: any) => setError(err.message || 'Failed to fetch country'))
            .finally(() => setLoading(false));
    }, [id]);

    return { country, loading, error };
}
