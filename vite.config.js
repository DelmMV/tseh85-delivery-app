/* eslint-disable-next-line */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import icons from './public/icons.json';

export default defineConfig({
  base: 'tseh85-delivery-app',
  plugins: [
    VitePWA({
      manifest: {
        name: 'Доставка85',
        short_name: 'Доставка85',
        description: 'Приложения для доставки заказов',
        theme_color: '#722020',
        icons: icons.icons,
      },
      registerType: 'autoUpdate',
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
      },
      devOptions: {
        enabled: true,
      },
    }),
    react(),
  ],
  server: {
    watch: {
      usePolling: true,
    },
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
    port: 3000, // replace this port with any number you want
  },
});
