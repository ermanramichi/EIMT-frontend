import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Chip, Paper, Button, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useCountry } from '../hooks/useCountries';
import LoadingError from '../components/LoadingError';
import PageHeader from '../components/PageHeader';

const CountryDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { country, loading, error } = useCountry(id ? Number(id) : undefined);

    return (
        <Box>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/countries')}
                sx={{ mb: 2 }}
            >
                Back to Countries
            </Button>

            <LoadingError loading={loading} error={error}>
                {country && (
                    <>
                        <PageHeader title={country.name} />
                        <Paper sx={{ p: 3 }}>
                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Country Name
                                    </Typography>
                                    <Typography variant="h6">{country.name}</Typography>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Continent
                                    </Typography>
                                    <Chip label={country.continent} color="info" sx={{ mt: 0.5 }} />
                                </Grid>
                            </Grid>
                        </Paper>
                    </>
                )}
            </LoadingError>
        </Box>
    );
};

export default CountryDetailPage;
