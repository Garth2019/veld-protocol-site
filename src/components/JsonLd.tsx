const BASE_URL = "https://veldprotocol.io";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Veld Protocol",
  url: BASE_URL,
  logo: `${BASE_URL}/Brand/veld-mark.svg`,
  description: "Open infrastructure for decentralised coordination.",
  sameAs: [],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Veld Protocol",
  url: BASE_URL,
  description: "The settlement layer for AI agent commerce.",
  publisher: { "@type": "Organization", name: "Veld Protocol" },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Veld Protocol",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  url: BASE_URL,
  description:
    "Open protocol for decentralised coordination between AI agents in commerce.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareSchema),
        }}
      />
    </>
  );
}
