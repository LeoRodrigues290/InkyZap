import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme/theme';

ReactDOM
    .createRoot(document.getElementById('root')!)
    .render(
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                {/* normalize e estilos base do MUI */}
                <CssBaseline />
                {/* toda a árvore de rotas */}
                <RouterProvider router={router} />
            </ThemeProvider>
        </React.StrictMode>
    );
