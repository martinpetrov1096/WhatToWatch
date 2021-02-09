import React from 'react';
import { ThemeProvider } from 'styled-components';

import { Router } from './routes/router';
import theme from './config/theme.json';
export default function App() {
   return (
      <ThemeProvider theme={theme}>
         <Router/>
      </ThemeProvider>
   );
}