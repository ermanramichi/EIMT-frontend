import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HotelIcon from '@mui/icons-material/Hotel';

const Header = () => {
    return (
        <AppBar position="sticky" sx={{ bgcolor: '#1a237e' }}>
            <Toolbar>
                <HotelIcon sx={{ mr: 1.5 }} />
                <Typography
                    variant="h6"
                    component={RouterLink}
                    to="/"
                    sx={{
                        flexGrow: 1,
                        textDecoration: 'none',
                        color: 'inherit',
                        fontWeight: 700,
                    }}
                >
                    EMT Accommodations
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button color="inherit" component={RouterLink} to="/">
                        Home
                    </Button>
                    <Button color="inherit" component={RouterLink} to="/accommodations">
                        Accommodations
                    </Button>
                    <Button color="inherit" component={RouterLink} to="/hosts">
                        Hosts
                    </Button>
                    <Button color="inherit" component={RouterLink} to="/countries">
                        Countries
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
