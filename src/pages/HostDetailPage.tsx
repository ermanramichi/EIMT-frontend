import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Button, Grid2 as Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHost } from '../hooks/useHosts';
import LoadingError from '../components/LoadingError';
import PageHeader from '../components/PageHeader';

const HostDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { host, loading, error } = useHost(id ? Number(id) : undefined);

    return (
        <Box>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/hosts')}
                sx={{ mb: 2 }}
            >
                Back to Hosts
            </Button>

            <LoadingError loading={loading} error={error}>
                {host && (
                    <>
                        <PageHeader title={`${host.name} ${host.surname}`} />
                        <Paper sx={{ p: 3 }}>
                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        First Name
                                    </Typography>
                                    <Typography variant="body1">{host.name}</Typography>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Last Name
                                    </Typography>
                                    <Typography variant="body1">{host.surname}</Typography>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Country
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{ cursor: 'pointer', color: 'primary.main', '&:hover': { textDecoration: 'underline' } }}
                                        onClick={() => navigate(`/countries/${host.countryId}`)}
                                    >
                                        {host.countryName}
                                    </Typography>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Member Since
                                    </Typography>
                                    <Typography variant="body2">
                                        {new Date(host.createdAt).toLocaleString()}
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

export default HostDetailPage;
