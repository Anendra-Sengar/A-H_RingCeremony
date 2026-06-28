import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://ring-ceremony-invitation.vercel.app";

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || productionUrl;

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];
}
