import React from 'react';
import { Home } from './views/Home.view';
import './App.css';
import { theme } from './ui/theme';
import { ThemeProvider } from '@material-ui/styles';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Home />
      </div>
    </ThemeProvider>
  );
};

export default App;
