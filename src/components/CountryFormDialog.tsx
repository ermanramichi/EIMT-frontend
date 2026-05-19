import { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Alert,
    Stack,
} from '@mui/material';
import { Country, CountryPayload } from '../types';

interface CountryFormDialogProps {
    open: boolean;
    initial?: Country | null;
    onClose: () => void;
    onSubmit: (payload: CountryPayload) => Promise<void>;
}

const empty: CountryPayload = { name: '', continent: '' };

const CountryFormDialog = ({ open, initial, onClose, onSubmit }: CountryFormDialogProps) => {
    const [form, setForm] = useState<CountryPayload>(empty);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!open) return;
        setError(null);
        setForm(initial ? { name: initial.name, continent: initial.continent } : empty);
    }, [open, initial]);

    const handleSubmit = async () => {
        setError(null);
        if (!form.name.trim()) return setError('Country name is required.');
        if (!form.continent.trim()) return setError('Continent is required.');

        setSubmitting(true);
        try {
            await onSubmit(form);
            onClose();
        } catch (err: any) {
            setError(err?.response?.data?.message || err.message || 'Failed to save country.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onClose={submitting ? undefined : onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{initial ? 'Edit Country' : 'Add Country'}</DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    {error && <Alert severity="error">{error}</Alert>}

                    <TextField
                        label="Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        autoFocus
                        fullWidth
                    />

                    <TextField
                        label="Continent"
                        value={form.continent}
                        onChange={(e) => setForm({ ...form, continent: e.target.value })}
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

export default CountryFormDialog;
