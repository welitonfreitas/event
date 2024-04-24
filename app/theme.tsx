import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
    palette: {
        primary: {
            main: '#454F5B',
        },
        secondary: {
            main: '#FA541C',
        },
        error: {
            main: red.A400,
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: 16,
    },
    spacing: 8,
});

export default theme;