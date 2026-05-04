import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                bgcolor: '#1a237e',
                color: 'white',
                textAlign: 'center',
            }}
        >
            <Typography variant="body2">
                &copy; {new Date().getFullYear()} EMT Lab — Accommodation Rental System
            </Typography>
        </Box>
    );
};

export default Footer;
