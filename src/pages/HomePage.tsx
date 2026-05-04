import { Box, Typography, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PersonIcon from '@mui/icons-material/Person';
import PublicIcon from '@mui/icons-material/Public';

const sections = [
    {
        title: 'Accommodations',
        description: 'Browse all available accommodations for rent.',
        icon: <ApartmentIcon sx={{ fontSize: 48 }} />,
        path: '/accommodations',
        color: '#1565c0',
    },
    {
        title: 'Hosts',
        description: 'View all registered hosts and their details.',
        icon: <PersonIcon sx={{ fontSize: 48 }} />,
        path: '/hosts',
        color: '#2e7d32',
    },
    {
        title: 'Countries',
        description: 'Explore countries where accommodations are available.',
        icon: <PublicIcon sx={{ fontSize: 48 }} />,
        path: '/countries',
        color: '#e65100',
    },
];

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <Box>
            <Box sx={{ textAlign: 'center', py: 6 }}>
                <Typography variant="h3" fontWeight={700} gutterBottom>
                    Welcome to EMT Accommodations
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                    Find and manage accommodation rentals across Europe. Browse accommodations, hosts,
                    and countries all in one place.
                </Typography>
            </Box>

            <Grid container spacing={4} sx={{ maxWidth: 900, mx: 'auto' }}>
                {sections.map((section) => (
                    <Grid size={{ xs: 12, md: 4 }} key={section.title}>
                        <Card sx={{ height: '100%' }}>
                            <CardActionArea
                                onClick={() => navigate(section.path)}
                                sx={{ height: '100%', p: 2 }}
                            >
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <Box sx={{ color: section.color, mb: 2 }}>{section.icon}</Box>
                                    <Typography variant="h5" fontWeight={600} gutterBottom>
                                        {section.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {section.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default HomePage;
