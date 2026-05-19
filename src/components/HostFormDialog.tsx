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
import { Country, Host, HostPayload } from '../types';

interface HostFormDialogProps {
    open: boolean;
    initial?: Host | null;
    countries: Country[];
    onClose: () => void;
    onSubmit: (payload: HostPayload) => Promise<void>;
}

const empty: HostPayload = { name: '', surname: '', countryId: 0 };

const HostFormDialog = ({ open, initial, countries, onClose, onSubmit }: HostFormDialogProps) => {
    const [form, setForm] = useState<HostPayload>(empty);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!open) return;
        setError(null);
        if (initial) {
            setForm({ name: initial.name, surname: initial.surname, countryId: initial.countryId });
        } else {
            setForm({ ...empty, countryId: countries[0]?.id ?? 0 });
        }
    }, [open, initial, countries]);

    const handleSubmit = async () => {
        setError(null);
        if (!form.name.trim()) return setError('First name is required.');
        if (!form.surname.trim()) return setError('Surname is required.');
        if (!form.countryId) return setError('A country must be selected.');

        setSubmitting(true);
        try {
            await onSubmit(form);
            onClose();
        } catch (err: any) {
            setError(err?.response?.data?.message || err.message || 'Failed to save host.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onClose={submitting ? undefined : onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{initial ? 'Edit Host' : 'Add Host'}</DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    {error && <Alert severity="error">{error}</Alert>}

                    <TextField
                        label="First name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        autoFocus
                        fullWidth
                    />

                    <TextField
                        label="Surname"
                        value={form.surname}
                        onChange={(e) => setForm({ ...form, surname: e.target.value })}
                        fullWidth
                    />

                    <TextField
                        label="Country"
                        select
                        value={form.countryId || ''}
                        onChange={(e) => setForm({ ...form, countryId: Number(e.target.value) })}
                        fullWidth
                    >
                        {countries.length === 0 && (
                            <MenuItem value="" disabled>No countries available — create one first</MenuItem>
                        )}
                        {countries.map((c) => (
                            <MenuItem key={c.id} value={c.id}>
                                {c.name} ({c.continent})
                            </MenuItem>
                        ))}
                    </TextField>
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

export default HostFormDialog;
