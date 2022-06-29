import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    typography: {
        fontFamily: [
            'Varela',
            // '-apple-system',
            // 'BlinkMacSystemFont',
            // 'Segoe UI',
            // 'Roboto',
            // 'Oxygen',
            // 'Ubuntu',
            // 'Cantarell',
            // 'Fira Sans',
            // 'Droid Sans',
            // 'Helvetica Neue',
            // 'sans-serif'
        ].join(','),
        // allVariants: {
        //     color: '#121124'
        // },
        body2: {
            color: '#4D4F60'
        },
        button: {
            textTransform: 'none'
        }
    },
    palette: {
        primary: {
            main: "#121124",
            contrastText: "#FFFFFF"
        },
        background: {
            default: "#FFFFFF",
            paper: "#FFFFFF",
        },
        text: {
            primary: "#121124",
        }
    }
    // components: {
    //     MuiButton: {
    //         styleOverrides: {
    //             root: {
    //                 borderRadius: 28,
    //             },
    //         },
    //     },
    // },
});