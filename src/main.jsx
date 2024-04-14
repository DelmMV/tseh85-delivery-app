import React from 'react';
import ReactDOM from 'react-dom/client';
import { extendTheme, ChakraProvider } from '@chakra-ui/react';
import App from './App';
import './index.css';
import 'leaflet/dist/leaflet.css';
import '@fontsource/open-sans';
import '@fontsource/raleway';

const fonts = {
  fonts: {
    heading: '\'Open Sans\', sans-serif',
    body: '\'Open Sans\', sans-serif',
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
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);
