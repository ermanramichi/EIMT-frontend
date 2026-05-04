import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
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

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/accommodations" element={<AccommodationsPage />} />
                        <Route path="/accommodations/:id" element={<AccommodationDetailPage />} />
                        <Route path="/hosts" element={<HostsPage />} />
                        <Route path="/hosts/:id" element={<HostDetailPage />} />
                        <Route path="/countries" element={<CountriesPage />} />
                        <Route path="/countries/:id" element={<CountryDetailPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
