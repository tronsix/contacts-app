import React from 'react';
import { 
  BrowserRouter as Router,
} from 'react-router-dom';
import ThemeProvider from './ThemeContext';
import AppContext from './AppContext';
import Routes from './Routes';

export default function App() {

  return (
    <Router forceRefresh={true}>
      <ThemeProvider>
        <AppContext>
          <Routes />
        </AppContext>
      </ThemeProvider>
    </Router>
  );
}