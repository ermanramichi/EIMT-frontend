import { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Alert,
    Stack,
} from '@mui/material';
import { Accommodation, AccommodationPayload, CATEGORIES, CONDITIONS, Host } from '../types';

interface AccommodationFormDialogProps {
    open: boolean;
    initial?: Accommodation | null;
    hosts: Host[];
    onClose: () => void;
    onSubmit: (payload: AccommodationPayload) => Promise<void>;
}

const empty: AccommodationPayload = {
    name: '',
    category: 'ROOM',
    hostId: 0,
    condition: 'GOOD',
    numRooms: 1,
};

/**
 * Modal form for creating or editing an accommodation.
 * Switches between "Add" and "Edit" mode based on whether {@code initial} is provided.
 */
const AccommodationFormDialog = ({
    open,
    initial,
    hosts,
    onClose,
    onSubmit,
}: AccommodationFormDialogProps) => {
    const [form, setForm] = useState<AccommodationPayload>(empty);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!open) return;
        setError(null);
        if (initial) {
            setForm({
                name: initial.name,
                category: initial.category,
                hostId: initial.hostId,
                condition: initial.condition,
                numRooms: initial.numRooms,
            });
        } else {
            setForm({ ...empty, hostId: hosts[0]?.id ?? 0 });
        }
    }, [open, initial, hosts]);

    const handleSubmit = async () => {
        setError(null);

        if (!form.name.trim()) return setError('Name is required.');
        if (!form.hostId) return setError('A host must be selected.');
        if (form.numRooms < 1) return setError('Number of rooms must be at least 1.');

        setSubmitting(true);
        try {
            await onSubmit(form);
            onClose();
        } catch (err: any) {
            setError(err?.response?.data?.message || err.message || 'Failed to save accommodation.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onClose={submitting ? undefined : onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{initial ? 'Edit Accommodation' : 'Add Accommodation'}</DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    {error && <Alert severity="error">{error}</Alert>}

                    <TextField
                        label="Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        fullWidth
                        autoFocus
                    />

                    <TextField
                        label="Category"
                        select
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                        fullWidth
                    >
                        {CATEGORIES.map((c) => (
                            <MenuItem key={c} value={c}>{c}</MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        label="Host"
                        select
                        value={form.hostId || ''}
                        onChange={(e) => setForm({ ...form, hostId: Number(e.target.value) })}
                        fullWidth
                    >
                        {hosts.length === 0 && (
                            <MenuItem value="" disabled>No hosts available — create one first</MenuItem>
                        )}
                        {hosts.map((h) => (
                            <MenuItem key={h.id} value={h.id}>
                                {h.name} {h.surname} ({h.countryName})
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        label="Condition"
                        select
                        value={form.condition}
                        onChange={(e) => setForm({ ...form, condition: e.target.value as any })}
                        fullWidth
                    >
                        {CONDITIONS.map((c) => (
                            <MenuItem key={c} value={c}>{c}</MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        label="Number of rooms"
                        type="number"
                        inputProps={{ min: 1 }}
                        value={form.numRooms}
                        onChange={(e) => setForm({ ...form, numRooms: Number(e.target.value) })}
                        fullWidth
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={submitting}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" disabled={submitting}>
                    {submitting ? 'Saving…' : initial ? 'Save changes' : 'Create'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AccommodationFormDialog;
