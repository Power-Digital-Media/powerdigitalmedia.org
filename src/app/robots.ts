import { MetadataRoute } from "next";

const PRIVATE_PATHS = [
  "/private/",
  "/admin/",
  "/dashboard/",
  "/login",
  "/logout",
  "/client-setup",
  "/api/",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: PRIVATE_PATHS,
      },
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-Web",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
        ],
        allow: ["/", "/llms.txt", "/llms-full.txt", "/.well-known/ard.json"],
        disallow: PRIVATE_PATHS,
      },
    ],
    sitemap: "https://powerdigitalmedia.org/sitemap.xml",
    host: "https://powerdigitalmedia.org",
  };
}
