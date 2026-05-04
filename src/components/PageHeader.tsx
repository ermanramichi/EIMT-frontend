import { Typography, Box, Divider } from '@mui/material';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
}

const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
    return (
        <Box sx={{ mb: 3 }}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
                {title}
            </Typography>
            {subtitle && (
                <Typography variant="body1" color="text.secondary">
                    {subtitle}
                </Typography>
            )}
            <Divider sx={{ mt: 2 }} />
        </Box>
    );
};

export default PageHeader;
