import { useState } from 'react';
import { Box, Button, Stack, Grid2 as Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useCountries } from '../hooks/useCountries';
import LoadingError from '../components/LoadingError';
import PageHeader from '../components/PageHeader';
import EntityCard from '../components/EntityCard';
import CountryFormDialog from '../components/CountryFormDialog';
import ConfirmDialog from '../components/ConfirmDialog';
import RoleGuard from '../components/RoleGuard';
import { useAuth } from '../context/AuthContext';
import { Country, CountryPayload } from '../types';

const CountriesPage = () => {
    const { countries, loading, error, create, update, remove } = useCountries();
    const { isAdministrator } = useAuth();

    const [formOpen, setFormOpen] = useState(false);
    const [editing, setEditing] = useState<Country | null>(null);

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleting, setDeleting] = useState<Country | null>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    const handleAdd = () => {
        setEditing(null);
        setFormOpen(true);
    };

    const handleEdit = (country: Country) => {
        setEditing(country);
        setFormOpen(true);
    };

    const handleSubmit = async (payload: CountryPayload) => {
        if (editing) {
            await update(editing.id, payload);
        } else {
            await create(payload);
        }
    };

    const handleDeleteRequest = (country: Country) => {
        setDeleting(country);
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
                    <PageHeader title="Countries" subtitle="Countries where accommodations are available" />
                </Box>
                <RoleGuard roles={['ADMINISTRATOR']}>
                    <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
                        Add country
                    </Button>
                </RoleGuard>
            </Stack>

            <LoadingError loading={loading} error={error}>
                <Grid container spacing={3}>
                    {countries.map((country) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={country.id}>
                            <EntityCard
                                title={country.name}
                                chips={[{ label: country.continent, color: 'info' }]}
                                linkTo={`/countries/${country.id}`}
                                onEdit={isAdministrator ? () => handleEdit(country) : undefined}
                                onDelete={isAdministrator ? () => handleDeleteRequest(country) : undefined}
                            />
                        </Grid>
                    ))}
                </Grid>
            </LoadingError>

            <CountryFormDialog
                open={formOpen}
                initial={editing}
                onClose={() => setFormOpen(false)}
                onSubmit={handleSubmit}
            />

            <ConfirmDialog
                open={confirmOpen}
                title="Delete country"
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

export default CountriesPage;
