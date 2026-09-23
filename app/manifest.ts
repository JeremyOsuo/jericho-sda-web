import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jericho SDA Church Sanctuary",
    short_name: "Jericho SDA",
    description: "Official portal, Sabbath bulletin, giving, and ministry calendar.",
    start_url: "/",
    display: "standalone",
    background_color: "#001129",
    theme_color: "#001737",
    icons: [
      {
        src: "/church-1.jpg",
        sizes: "192x192",
        type: "image/jpeg",
      },
      {
        src: "/church-1.jpg",
        sizes: "512x512",
        type: "image/jpeg",
      },
    ],
  };
}