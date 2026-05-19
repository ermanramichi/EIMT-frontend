import { useState, FormEvent } from 'react';
import {
    Box,
    Paper,
    TextField,
    Button,
    Typography,
    Alert,
    Stack,
    Link as MuiLink,
} from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate, Navigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import { useAuth } from '../context/AuthContext';

interface LocationState {
    from?: { pathname?: string };
}

const LoginPage = () => {
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = (location.state as LocationState)?.from?.pathname || '/';

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    if (isAuthenticated) {
        return <Navigate to={from} replace />;
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!username.trim() || !password) {
            setError('Username and password are required.');
            return;
        }
        setSubmitting(true);
        try {
            await login({ username, password });
            navigate(from, { replace: true });
        } catch (err: any) {
            if (err?.response?.status === 401 || err?.response?.status === 403) {
                setError('Invalid username or password.');
            } else {
                setError(err?.response?.data?.message || err.message || 'Login failed.');
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <Paper sx={{ p: 4, width: '100%', maxWidth: 400 }} elevation={3}>
                <Stack alignItems="center" spacing={1} sx={{ mb: 3 }}>
                    <LoginIcon color="primary" sx={{ fontSize: 40 }} />
                    <Typography variant="h5" fontWeight={700}>Welcome back</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Sign in to manage accommodations.
                    </Typography>
                </Stack>

                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        {error && <Alert severity="error">{error}</Alert>}
                        <TextField
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoFocus
                            fullWidth
                            autoComplete="username"
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            autoComplete="current-password"
                        />
                        <Button type="submit" variant="contained" disabled={submitting} fullWidth>
                            {submitting ? 'Signing in…' : 'Sign in'}
                        </Button>
                        <Typography variant="body2" color="text.secondary" textAlign="center">
                            Don't have an account?{' '}
                            <MuiLink component={RouterLink} to="/register">Register</MuiLink>
                        </Typography>
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
};

export default LoginPage;
