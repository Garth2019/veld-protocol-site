import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works",
  description: "Understand the core mechanics of the Veld Protocol.",
};

export default function HowItWorks() {
  return (
    <section className="min-h-[calc(100vh-4rem)] px-4 sm:px-6 lg:px-8 py-16 sm:py-24 max-w-4xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-veld-light">
        How It Works
      </h1>
      <p className="mt-4 text-veld-pale/60">
        Content coming soon.
      </p>
    </section>
  );
}
