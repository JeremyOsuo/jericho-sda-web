import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/"], // Blocks Google from indexing your secret admin desk
      },
    ],
    sitemap: "https://jerichosda.church/sitemap.xml",
  };
}