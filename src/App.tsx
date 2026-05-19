import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccommodationsPage from './pages/AccommodationsPage';
import AccommodationDetailPage from './pages/AccommodationDetailPage';
import HostsPage from './pages/HostsPage';
import HostDetailPage from './pages/HostDetailPage';
import CountriesPage from './pages/CountriesPage';
import CountryDetailPage from './pages/CountryDetailPage';

const theme = createTheme({
    palette: {
        primary: { main: '#1a237e' },
        secondary: { main: '#ff6f00' },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
});

/**
 * Both USER and ADMINISTRATOR roles can READ; only ADMINISTRATOR can write
 * (write authorization is enforced server-side and via <RoleGuard> in the UI).
 */
const READ_ROLES = ['USER', 'ADMINISTRATOR'] as const;

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route element={<Layout />}>
                            {/* Public */}
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />

                            {/* Authenticated-only — both roles can read */}
                            <Route
                                path="/accommodations"
                                element={
                                    <ProtectedRoute roles={[...READ_ROLES]}>
                                        <AccommodationsPage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/accommodations/:id"
                                element={
                                    <ProtectedRoute roles={[...READ_ROLES]}>
                                        <AccommodationDetailPage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/hosts"
                                element={
                                    <ProtectedRoute roles={[...READ_ROLES]}>
                                        <HostsPage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/hosts/:id"
                                element={
                                    <ProtectedRoute roles={[...READ_ROLES]}>
                                        <HostDetailPage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/countries"
                                element={
                                    <ProtectedRoute roles={[...READ_ROLES]}>
                                        <CountriesPage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/countries/:id"
                                element={
                                    <ProtectedRoute roles={[...READ_ROLES]}>
                                        <CountryDetailPage />
                                    </ProtectedRoute>
                                }
                            />
                        </Route>
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
