import { useState } from 'react';
import { Box, Button, Stack, Grid2 as Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useHosts } from '../hooks/useHosts';
import { useCountries } from '../hooks/useCountries';
import LoadingError from '../components/LoadingError';
import PageHeader from '../components/PageHeader';
import EntityCard from '../components/EntityCard';
import HostFormDialog from '../components/HostFormDialog';
import ConfirmDialog from '../components/ConfirmDialog';
import RoleGuard from '../components/RoleGuard';
import { useAuth } from '../context/AuthContext';
import { Host, HostPayload } from '../types';

const HostsPage = () => {
    const { hosts, loading, error, create, update, remove } = useHosts();
    const { countries } = useCountries();
    const { isAdministrator } = useAuth();

    const [formOpen, setFormOpen] = useState(false);
    const [editing, setEditing] = useState<Host | null>(null);

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleting, setDeleting] = useState<Host | null>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    const handleAdd = () => {
        setEditing(null);
        setFormOpen(true);
    };

    const handleEdit = (host: Host) => {
        setEditing(host);
        setFormOpen(true);
    };

    const handleSubmit = async (payload: HostPayload) => {
        if (editing) {
            await update(editing.id, payload);
        } else {
            await create(payload);
        }
    };

    const handleDeleteRequest = (host: Host) => {
        setDeleting(host);
        setDeleteError(null);
        setConfirmOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!deleting) return;
        setDeleteLoading(true);
        setDeleteError(null);
        try {
            await remove(deleting.id);
            setConfirmOpen(false);
            setDeleting(null);
        } catch (err: any) {
            setDeleteError(err?.response?.data?.message || err.message || 'Failed to delete.');
        } finally {
            setDeleteLoading(false);
        }
    };

    return (
        <Box>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                spacing={2}
                sx={{ mb: 2 }}
            >
                <Box sx={{ flexGrow: 1 }}>
                    <PageHeader title="Hosts" subtitle="All registered accommodation hosts" />
                </Box>
                <RoleGuard roles={['ADMINISTRATOR']}>
                    <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
                        Add host
                    </Button>
                </RoleGuard>
            </Stack>

            <LoadingError loading={loading} error={error}>
                <Grid container spacing={3}>
                    {hosts.map((host) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={host.id}>
                            <EntityCard
                                title={`${host.name} ${host.surname}`}
                                subtitle={`Country: ${host.countryName}`}
                                details={[
                                    {
                                        label: 'Member since',
                                        value: new Date(host.createdAt).toLocaleDateString(),
                                    },
                                ]}
                                linkTo={`/hosts/${host.id}`}
                                onEdit={isAdministrator ? () => handleEdit(host) : undefined}
                                onDelete={isAdministrator ? () => handleDeleteRequest(host) : undefined}
                            />
                        </Grid>
                    ))}
                </Grid>
            </LoadingError>

            <HostFormDialog
                open={formOpen}
                initial={editing}
                countries={countries}
                onClose={() => setFormOpen(false)}
                onSubmit={handleSubmit}
            />

            <ConfirmDialog
                open={confirmOpen}
                title="Delete host"
                message={
                    deleteError
                        ? deleteError
                        : `Are you sure you want to delete "${deleting?.name ?? ''} ${deleting?.surname ?? ''}"? This cannot be undone.`
                }
                confirmLabel="Delete"
                destructive
                loading={deleteLoading}
                onConfirm={handleConfirmDelete}
                onClose={() => {
                    setConfirmOpen(false);
                    setDeleting(null);
                    setDeleteError(null);
                }}
            />
        </Box>
    );
};

export default HostsPage;
