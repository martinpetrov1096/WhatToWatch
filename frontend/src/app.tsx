import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ToastProvider } from 'react-toast-notifications'

import { Router } from './routes/router';
import theme from './config/theme.json';
export default function App() {
   return (
      <ToastProvider autoDismiss={true} autoDismissTimeout={2000}>
         <ThemeProvider theme={theme}>
            <Router/>
         </ThemeProvider>
      </ToastProvider>

   );
}