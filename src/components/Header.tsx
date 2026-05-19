import { AppBar, Toolbar, Typography, Button, Box, Chip, Stack } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import HotelIcon from '@mui/icons-material/Hotel';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

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

                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Button color="inherit" component={RouterLink} to="/">Home</Button>

                    {isAuthenticated && (
                        <>
                            <Button color="inherit" component={RouterLink} to="/accommodations">
                                Accommodations
                            </Button>
                            <Button color="inherit" component={RouterLink} to="/hosts">Hosts</Button>
                            <Button color="inherit" component={RouterLink} to="/countries">Countries</Button>
                        </>
                    )}

                    {!isAuthenticated && (
                        <>
                            <Button color="inherit" component={RouterLink} to="/login" startIcon={<LoginIcon />}>
                                Log in
                            </Button>
                            <Button
                                color="inherit"
                                component={RouterLink}
                                to="/register"
                                variant="outlined"
                                sx={{ borderColor: 'rgba(255,255,255,0.5)' }}
                            >
                                Register
                            </Button>
                        </>
                    )}

                    {isAuthenticated && user && (
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ ml: 1 }}>
                            <Box sx={{ textAlign: 'right' }}>
                                <Typography variant="body2" sx={{ lineHeight: 1.1 }}>
                                    {user.name}
                                </Typography>
                                <Chip
                                    label={user.role}
                                    size="small"
                                    color={user.role === 'ADMINISTRATOR' ? 'secondary' : 'default'}
                                    sx={{ height: 18, fontSize: 10 }}
                                />
                            </Box>
                            <Button
                                color="inherit"
                                onClick={handleLogout}
                                startIcon={<LogoutIcon />}
                            >
                                Logout
                            </Button>
                        </Stack>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
