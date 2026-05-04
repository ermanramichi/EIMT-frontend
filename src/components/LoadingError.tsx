import { Alert, Box, CircularProgress } from '@mui/material';

interface LoadingErrorProps {
    loading: boolean;
    error: string | null;
    children: React.ReactNode;
}

const LoadingError = ({ loading, error, children }: LoadingErrorProps) => {
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ mt: 2 }}>
                {error}
            </Alert>
        );
    }

    return <>{children}</>;
};

export default LoadingError;
