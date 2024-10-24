// service-worker.js
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";

precacheAndRoute(self.__WB_MANIFEST);

// Cache the offline page
const OFFLINE_URL = "/offline.html";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("offline-cache").then((cache) => {
      return cache.addAll([OFFLINE_URL]);
    })
  );
});

// Fallback to offline page if the requested page is not cached
registerRoute(
  ({ request }) => request.mode === "navigate", // Only handle navigation requests
  async ({ request }) => {
    try {
      const response = await fetch(request);
      return response;
    } catch (error) {
      // Return the offline page if the fetch fails
      return caches.match(OFFLINE_URL);
    }
  }
);
