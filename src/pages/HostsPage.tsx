import { Grid, Box } from '@mui/material';
import { useHosts } from '../hooks/useHosts';
import LoadingError from '../components/LoadingError';
import PageHeader from '../components/PageHeader';
import EntityCard from '../components/EntityCard';

const HostsPage = () => {
    const { hosts, loading, error } = useHosts();

    return (
        <Box>
            <PageHeader title="Hosts" subtitle="All registered accommodation hosts" />
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
                            />
                        </Grid>
                    ))}
                </Grid>
            </LoadingError>
        </Box>
    );
};

export default HostsPage;
