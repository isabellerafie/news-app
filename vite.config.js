import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate", //  Automatically updates the service worker in the background when a new version is available.
      devOptions: {
        enabled: true, // Enable PWA in development
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
            src: "/logosmall.png", // Path to your icons
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
    }),
  ],
  proxy: "https://www.almarkazia.com",
});
