import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3030,
    open: true,
    proxy: {
  // We have to set up our Vite client-side development server to proxy API requests to our server-side Node server at port 3005 in order to hit our GraphQL application.
      '/graphql': {
        target: 'http://localhost:3005',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});


   