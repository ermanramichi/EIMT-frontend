import { useCallback, useEffect, useState } from 'react';
import { Host, HostPayload } from '../types';
import HostRepository from '../api/hostRepository';

export function useHosts() {
    const [hosts, setHosts] = useState<Host[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchHosts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await HostRepository.findAll();
            setHosts(result);
        } catch (err: any) {
            setError(err?.response?.data?.message || err.message || 'Failed to fetch hosts');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchHosts();
    }, [fetchHosts]);

    const create = useCallback(async (payload: HostPayload) => {
        await HostRepository.create(payload);
        await fetchHosts();
    }, [fetchHosts]);

    const update = useCallback(async (id: number, payload: HostPayload) => {
        await HostRepository.update(id, payload);
        await fetchHosts();
    }, [fetchHosts]);

    const remove = useCallback(async (id: number) => {
        await HostRepository.remove(id);
        await fetchHosts();
    }, [fetchHosts]);

    return { hosts, loading, error, refetch: fetchHosts, create, update, remove };
}

export function useHost(id: number | undefined) {
    const [host, setHost] = useState<Host | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id === undefined) return;
        setLoading(true);
        setError(null);
        HostRepository.findById(id)
            .then(setHost)
            .catch((err: any) =>
                setError(err?.response?.data?.message || err.message || 'Failed to fetch host'),
            )
            .finally(() => setLoading(false));
    }, [id]);

    return { host, loading, error };
}
