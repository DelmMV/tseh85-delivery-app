import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import '@fontsource/open-sans';
import '@fontsource/raleway';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './router/AuthProvider';

const fonts = {
  fonts: {
    heading: "'Open Sans', sans-serif",
    body: "'Open Sans', sans-serif",
  },
};

const theme = extendTheme({
  ...fonts,
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'light' ? '#F2F2F2' : undefined,
      },
    }),
  },
});

const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>,
);
