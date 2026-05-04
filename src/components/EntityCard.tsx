import { Card, CardContent, CardActionArea, Typography, Chip, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface EntityCardProps {
    title: string;
    subtitle?: string;
    chips?: { label: string; color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' }[];
    details?: { label: string; value: string | number }[];
    linkTo?: string;
}

const EntityCard = ({ title, subtitle, chips, details, linkTo }: EntityCardProps) => {
    const navigate = useNavigate();

    const content = (
        <CardContent>
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>
            {subtitle && (
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    {subtitle}
                </Typography>
            )}
            {chips && chips.length > 0 && (
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 1 }}>
                    {chips.map((chip, idx) => (
                        <Chip key={idx} label={chip.label} size="small" color={chip.color || 'default'} />
                    ))}
                </Box>
            )}
            {details && details.length > 0 && (
                <Box sx={{ mt: 1 }}>
                    {details.map((detail, idx) => (
                        <Typography key={idx} variant="body2" color="text.secondary">
                            <strong>{detail.label}:</strong> {detail.value}
                        </Typography>
                    ))}
                </Box>
            )}
        </CardContent>
    );

    if (linkTo) {
        return (
            <Card sx={{ height: '100%' }}>
                <CardActionArea onClick={() => navigate(linkTo)} sx={{ height: '100%' }}>
                    {content}
                </CardActionArea>
            </Card>
        );
    }

    return <Card sx={{ height: '100%' }}>{content}</Card>;
};

export default EntityCard;
