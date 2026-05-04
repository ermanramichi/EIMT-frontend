import { Grid, Box } from '@mui/material';
import { useCountries } from '../hooks/useCountries';
import LoadingError from '../components/LoadingError';
import PageHeader from '../components/PageHeader';
import EntityCard from '../components/EntityCard';

const CountriesPage = () => {
    const { countries, loading, error } = useCountries();

    return (
        <Box>
            <PageHeader title="Countries" subtitle="Countries where accommodations are available" />
            <LoadingError loading={loading} error={error}>
                <Grid container spacing={3}>
                    {countries.map((country) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={country.id}>
                            <EntityCard
                                title={country.name}
                                chips={[{ label: country.continent, color: 'info' }]}
                                linkTo={`/countries/${country.id}`}
                            />
                        </Grid>
                    ))}
                </Grid>
            </LoadingError>
        </Box>
    );
};

export default CountriesPage;
