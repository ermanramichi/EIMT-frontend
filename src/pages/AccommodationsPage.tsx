import { useState } from 'react';
import { Grid, Pagination, Box } from '@mui/material';
import { useAccommodations } from '../hooks/useAccommodations';
import LoadingError from '../components/LoadingError';
import PageHeader from '../components/PageHeader';
import EntityCard from '../components/EntityCard';

const AccommodationsPage = () => {
    const [page, setPage] = useState(0);
    const { data, loading, error } = useAccommodations(page, 9);

    return (
        <Box>
            <PageHeader
                title="Accommodations"
                subtitle="Browse all available accommodations for rent"
            />
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
        </Box>
    );
};

export default AccommodationsPage;
