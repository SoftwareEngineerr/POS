import logo from './logo.svg';
// import './App.css';
import { useRoutes } from 'react-router';
import { Router } from './routes/routes';
import Loader from './components/loader/loader'

import { CssBaseline, ThemeProvider } from '@mui/material';

import './assets/css/index.scss'
import Popup from './components/popup/popup';

import { FirstTimeWebSrn } from './hooks/FirstTimeWebSrn/FirstTimeWebSrn';
import { Themefunc } from './theme/DefaultColors';

// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  
  const routing = useRoutes(Router);
  const theme = Themefunc();

  return (
    <ThemeProvider theme={theme}>
      <FirstTimeWebSrn />
      <Popup />
      <Loader />
    <CssBaseline />
    {routing}

  </ThemeProvider>
  )
}

export default App;
