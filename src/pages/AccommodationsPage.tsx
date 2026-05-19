import { useState } from 'react';
import { Pagination, Box, Button, Stack, Grid2 as Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useAccommodations } from '../hooks/useAccommodations';
import { useHosts } from '../hooks/useHosts';
import LoadingError from '../components/LoadingError';
import PageHeader from '../components/PageHeader';
import EntityCard from '../components/EntityCard';
import AccommodationFormDialog from '../components/AccommodationFormDialog';
import ConfirmDialog from '../components/ConfirmDialog';
import RoleGuard from '../components/RoleGuard';
import { useAuth } from '../context/AuthContext';
import { Accommodation, AccommodationPayload } from '../types';

const AccommodationsPage = () => {
    const [page, setPage] = useState(0);
    const { data, loading, error, create, update, remove } = useAccommodations(page, 9);
    const { hosts } = useHosts();
    const { isAdministrator } = useAuth();

    const [formOpen, setFormOpen] = useState(false);
    const [editing, setEditing] = useState<Accommodation | null>(null);

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleting, setDeleting] = useState<Accommodation | null>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    const handleAdd = () => {
        setEditing(null);
        setFormOpen(true);
    };

    const handleEdit = (acc: Accommodation) => {
        setEditing(acc);
        setFormOpen(true);
    };

    const handleSubmit = async (payload: AccommodationPayload) => {
        if (editing) {
            await update(editing.id, payload);
        } else {
            await create(payload);
        }
    };

    const handleDeleteRequest = (acc: Accommodation) => {
        setDeleting(acc);
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
                    <PageHeader
                        title="Accommodations"
                        subtitle="Browse all available accommodations for rent"
                    />
                </Box>
                <RoleGuard roles={['ADMINISTRATOR']}>
                    <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
                        Add accommodation
                    </Button>
                </RoleGuard>
            </Stack>

            <LoadingError loading={loading} error={error}>
                <Grid container spacing={3}>
                    {data?.content.map((acc) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={acc.id}>
                            <EntityCard
                                title={acc.name}
                                subtitle={`Hosted by ${acc.hostFullName}`}
                                chips={[
                                    { label: acc.category, color: 'primary' },
                                    {
                                        label: acc.condition,
                                        color: acc.condition === 'GOOD' ? 'success' : 'error',
                                    },
                                ]}
                                details={[
                                    { label: 'Rooms', value: acc.numRooms },
                                    { label: 'Rented', value: acc.rented ? 'Yes' : 'No' },
                                ]}
                                linkTo={`/accommodations/${acc.id}`}
                                onEdit={isAdministrator ? () => handleEdit(acc) : undefined}
                                onDelete={isAdministrator ? () => handleDeleteRequest(acc) : undefined}
                            />
                        </Grid>
                    ))}
                </Grid>

                {data && data.totalPages > 1 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Pagination
                            count={data.totalPages}
                            page={page + 1}
                            onChange={(_, value) => setPage(value - 1)}
                            color="primary"
                        />
                    </Box>
                )}
            </LoadingError>

            <AccommodationFormDialog
                open={formOpen}
                initial={editing}
                hosts={hosts}
                onClose={() => setFormOpen(false)}
                onSubmit={handleSubmit}
            />

            <ConfirmDialog
                open={confirmOpen}
                title="Delete accommodation"
                message={
                    deleteError
                        ? deleteError
                        : `Are you sure you want to delete "${deleting?.name ?? ''}"? This cannot be undone.`
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

export default AccommodationsPage;
