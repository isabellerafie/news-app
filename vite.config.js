import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
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
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith("/assets"),
            handler: "CacheFirst",
            options: {
              cacheName: "static-assets",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
              },
            },
          },
          {
            urlPattern: ({ url }) =>
              url.origin === "https://www.almarkazia.com",
            handler: "StaleWhileRevalidate", // Serve cache and update in background
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 24 * 60 * 60, // Cache for 1 day
              },
              networkTimeoutSeconds: 5,
            },
          },
          {
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
                maxAgeSeconds: 30 * 24 * 60 * 60,
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
