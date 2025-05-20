import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "My Next.js PWA",
    short_name: "MyPWA",
    description: "A Progressive Web App built with Next.js 15",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        form_factor: "narrow",
      },
      {
        src: "/web-app-manifest-192x192.png",
        type: "image/png",
        sizes: "2460x1674",
        form_factor: "wide",
      },
      {
        src: "/web-app-manifest-192x192.png",
        type: "image/png",
        sizes: "2460x1674",
        form_factor: "wide",
      },
    ],
  };
}
