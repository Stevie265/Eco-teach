import type { MetadataRoute } from "next";

/** Web app manifest: name and icons used when Eco-teach is added to a home screen. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Eco-teach",
    short_name: "Eco-teach",
    description: "Bite-sized, visual lessons on energy, climate tech and the future home.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f1e3",
    theme_color: "#f7f1e3",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
