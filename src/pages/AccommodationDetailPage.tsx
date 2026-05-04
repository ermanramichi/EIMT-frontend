import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Chip, Paper, Button, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAccommodation } from '../hooks/useAccommodations';
import LoadingError from '../components/LoadingError';
import PageHeader from '../components/PageHeader';

const AccommodationDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { accommodation, loading, error } = useAccommodation(id ? Number(id) : undefined);

    return (
        <Box>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/accommodations')}
                sx={{ mb: 2 }}
            >
                Back to Accommodations
            </Button>

            <LoadingError loading={loading} error={error}>
                {accommodation && (
                    <>
                        <PageHeader title={accommodation.name} />
                        <Paper sx={{ p: 3 }}>
                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Category
                                    </Typography>
                                    <Chip label={accommodation.category} color="primary" sx={{ mt: 0.5 }} />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Condition
                                    </Typography>
                                    <Chip
                                        label={accommodation.condition}
                                        color={accommodation.condition === 'GOOD' ? 'success' : 'error'}
                                        sx={{ mt: 0.5 }}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Host
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{ cursor: 'pointer', color: 'primary.main', '&:hover': { textDecoration: 'underline' } }}
                                        onClick={() => navigate(`/hosts/${accommodation.hostId}`)}
                                    >
                                        {accommodation.hostFullName}
                                    </Typography>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Number of Rooms
                                    </Typography>
                                    <Typography variant="body1">{accommodation.numRooms}</Typography>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Rented
                                    </Typography>
                                    <Chip
                                        label={accommodation.rented ? 'Yes' : 'No'}
                                        color={accommodation.rented ? 'warning' : 'info'}
                                        size="small"
                                        sx={{ mt: 0.5 }}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Created At
                                    </Typography>
                                    <Typography variant="body2">
                                        {new Date(accommodation.createdAt).toLocaleString()}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </>
                )}
            </LoadingError>
        </Box>
    );
};

export default AccommodationDetailPage;
