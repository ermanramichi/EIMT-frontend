import {
    Card,
    CardContent,
    CardActionArea,
    CardActions,
    Typography,
    Chip,
    Box,
    IconButton,
    Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface EntityCardProps {
    title: string;
    subtitle?: string;
    chips?: {
        label: string;
        color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
    }[];
    details?: { label: string; value: string | number }[];
    linkTo?: string;
    onEdit?: () => void;
    onDelete?: () => void;
    /** Extra adornments rendered in the actions row (e.g. role-gated buttons). */
    extraActions?: ReactNode;
}

/**
 * Generic display card used by Accommodations, Hosts, and Countries lists.
 * Edit / Delete buttons are only rendered when their handlers are provided —
 * callers wrap them in <RoleGuard> to make the visibility role-aware.
 */
const EntityCard = ({
    title,
    subtitle,
    chips,
    details,
    linkTo,
    onEdit,
    onDelete,
    extraActions,
}: EntityCardProps) => {
    const navigate = useNavigate();

    const body = (
        <CardContent>
            <Typography variant="h6" gutterBottom>{title}</Typography>
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

    const showActions = onEdit || onDelete || extraActions;

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {linkTo ? (
                <CardActionArea onClick={() => navigate(linkTo)} sx={{ flexGrow: 1, alignItems: 'stretch' }}>
                    {body}
                </CardActionArea>
            ) : (
                <Box sx={{ flexGrow: 1 }}>{body}</Box>
            )}

            {showActions && (
                <CardActions sx={{ justifyContent: 'flex-end', borderTop: '1px solid', borderColor: 'divider' }}>
                    {extraActions}
                    {onEdit && (
                        <Tooltip title="Edit">
                            <IconButton size="small" onClick={onEdit} aria-label="edit">
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}
                    {onDelete && (
                        <Tooltip title="Delete">
                            <IconButton size="small" color="error" onClick={onDelete} aria-label="delete">
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}
                </CardActions>
            )}
        </Card>
    );
};

export default EntityCard;
