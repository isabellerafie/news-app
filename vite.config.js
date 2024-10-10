import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate", // Automatically update the service worker
      devOptions: {
        enabled: true, // Enable service worker in development mode
      },
      manifest: {
        name: "News App",
        short_name: "getNews",
        start_url: "/",
        display: "standalone",
        description: "Stay Informed, Stay Ahead",
        theme_color: "#00112f",
        icons: [
          {
            src: "/logosmall.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/logobig.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        // Configuration for Workbox to handle caching
        runtimeCaching: [
          {
            //lal fonts
            urlPattern: ({ url }) => url.pathname.startsWith("/assets"),
            handler: "CacheFirst", //Serve from cache first, then network
            options: {
              cacheName: "static-assets",
              expiration: {
                maxEntries: 50, // Maximum number of entries in this cache
                maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
              },
            },
          },
          {
            //lal api responses
            urlPattern: ({ url }) =>
              url.origin === "https://www.almarkazia.com",
            handler: "NetworkFirst", //Fetch from network first, then cache
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 24 * 60 * 60, // Cache for 1 day
              },
              networkTimeoutSeconds: 5, // Wait for the network response for 5 seconds before falling back to cache
            },
          },
          {
            //lal suwar
            urlPattern: ({ url }) =>
              url.pathname.endsWith(".png") ||
              url.pathname.endsWith(".css") ||
              url.pathname.endsWith(".svg") ||
              url.pathname.endsWith(".ttf"),
            handler: "CacheFirst",
            options: {
              cacheName: "static-files",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // Cache duration (30 days)
              },
            },
          },
          {
            // Handle navigation requests for React Router
            urlPattern: ({ request, url }) =>
              request.mode === "navigate" &&
              !url.pathname.startsWith("/assets"),
            handler: "NetworkFirst",
            options: {
              cacheName: "pages-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 7 * 24 * 60 * 60, // Cache for 7 days
              },
            },
          },
        ],
      },
    }),
  ],
});
