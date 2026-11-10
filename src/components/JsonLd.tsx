import { SITE_URL } from "@/lib/site";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Veld Protocol",
  url: SITE_URL,
  logo: `${SITE_URL}/Brand/veld-mark.svg`,
  description: "Open infrastructure for decentralised coordination.",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Veld Protocol",
  url: SITE_URL,
  description: "The settlement layer for AI agent commerce.",
  publisher: { "@type": "Organization", name: "Veld Protocol" },
};

// No SoftwareApplication node: Google's software-app rich result requires an
// aggregateRating or review, and Veld has neither to publish.
const SCHEMAS = [organizationSchema, websiteSchema];

export function JsonLd() {
  return (
    <>
      {SCHEMAS.map((schema) => (
        <script
          key={schema["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
