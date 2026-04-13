import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Updates, insights, and technical deep-dives from the Veld Protocol team.",
};

export default function Blog() {
  return (
    <section className="min-h-[calc(100vh-4rem)] px-4 sm:px-6 lg:px-8 py-16 sm:py-24 max-w-4xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-veld-light">
        Blog
      </h1>
      <p className="mt-4 text-veld-pale/60">
        Content coming soon.
      </p>
    </section>
  );
}
