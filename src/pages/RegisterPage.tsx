import { useState, FormEvent } from 'react';
import {
    Box,
    Paper,
    TextField,
    Button,
    Typography,
    Alert,
    Stack,
    MenuItem,
    Link as MuiLink,
} from '@mui/material';
import { Link as RouterLink, useNavigate, Navigate } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useAuth } from '../context/AuthContext';
import { AppRole } from '../types';

const RegisterPage = () => {
    const { register, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<AppRole>('USER');
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!name.trim() || !username.trim() || !password) {
            setError('All fields are required.');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }

        setSubmitting(true);
        try {
            await register({ name, username, password, role });
            navigate('/', { replace: true });
        } catch (err: any) {
            if (err?.response?.status === 409) {
                setError('That username is already taken.');
            } else {
                setError(err?.response?.data?.message || err.message || 'Registration failed.');
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <Paper sx={{ p: 4, width: '100%', maxWidth: 440 }} elevation={3}>
                <Stack alignItems="center" spacing={1} sx={{ mb: 3 }}>
                    <PersonAddIcon color="primary" sx={{ fontSize: 40 }} />
                    <Typography variant="h5" fontWeight={700}>Create an account</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Pick a role to define your access level.
                    </Typography>
                </Stack>

                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        {error && <Alert severity="error">{error}</Alert>}

                        <TextField
                            label="Full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            autoFocus
                            fullWidth
                        />
                        <TextField
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            fullWidth
                            autoComplete="username"
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            helperText="At least 6 characters."
                            autoComplete="new-password"
                        />
                        <TextField
                            label="Role"
                            select
                            value={role}
                            onChange={(e) => setRole(e.target.value as AppRole)}
                            fullWidth
                            helperText="USER = read-only access. ADMINISTRATOR = full CRUD."
                        >
                            <MenuItem value="USER">USER</MenuItem>
                            <MenuItem value="ADMINISTRATOR">ADMINISTRATOR</MenuItem>
                        </TextField>

                        <Button type="submit" variant="contained" disabled={submitting} fullWidth>
                            {submitting ? 'Creating account…' : 'Register'}
                        </Button>

                        <Typography variant="body2" color="text.secondary" textAlign="center">
                            Already have an account?{' '}
                            <MuiLink component={RouterLink} to="/login">Sign in</MuiLink>
                        </Typography>
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
};

export default RegisterPage;
