import React from 'react';
import { createMuiTheme, ThemeProvider as Theme } from '@material-ui/core/styles';
import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/600.css";

  const primary = '#1a1e75';
  const font = 'Open Sans';
  
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: primary,
        light: '#e0eafa'
      },
      secondary: {
        main: '#fab132',
        light: '#faf1e1',
      },
      error: {
        main: '#fa3232',
        light: '#fae1e1',
      },
    },
    typography: {
      h1: {
        color: primary,
        fontFamily: font,
        fontSize: '2.5rem',
        lineHeight: '2.9375rem',
        letterSpacing: 0,
      },
      h2: {
        color: primary,
        fontFamily: font,
        fontSize: '1.125rem',
        fontWeight: 400,
        lineHeight: '1.6875rem',
        letterSpacing: 0,
      },
      body1: {
        fontFamily: font,
        fontSize: '.875rem',
        fontWeight: 400,
        lineHeight: '1.375rem',
      },
      button: {
        fontFamily: font,
        fontSize: '.875rem',
        fontWeight: 600,
        lineHeight: '1.375rem',
        textTransform: 'none'
      },
    },
  });
  
  export default function ThemeProvider(props) {
    return (
      <Theme theme={theme} {...props} />
    );
  }