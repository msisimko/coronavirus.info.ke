import React from 'react';
import ReactDOM from 'react-dom';

// App component that renders the rest of the application
import App from './app';

// CssBaseline component to kickstart an elegant,
// consistent, and simple baseline to build upon
// See: https://material-ui.com/components/css-baseline/
import CssBaseline from '@material-ui/core/CssBaseline';

// Imports the createMuiTheme() method that allows us
// to customize the default theme & the ThemeProvider
// component for injecting the theme into the application.
// See: https://material-ui.com/customization/default-theme/
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Firebase, { FirebaseContext } from './firebase';

import * as serviceWorker from './serviceWorker';

// Using the createMuiTheme() method, we can override the default theme
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#14213d',
    },
    error: {
      main: '#470021',
    },
    warning: {
      main: '#fca311',
    },
    info: {
      main: '#e5e5e5',
    },
    success: {
      main: '#004726',
    },
    background: {
      default: '#e6ecf0',
    },
  },
  overrides: {
    MuiFormHelperText: {
      contained: {
        marginLeft: 0,
        marginRight: 0,
      },
    }
  }
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {/* The rest of the application */}
    <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
