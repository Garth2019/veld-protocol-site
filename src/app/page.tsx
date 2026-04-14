import { VeldHero } from "@/components/hero/VeldHero";
import { WaitlistForm } from "@/components/WaitlistForm";

export default function Home() {
  return (
    <>
      <VeldHero />

      {/* Waitlist section — demoted below the primary hero */}
      <section
        aria-labelledby="waitlist-heading"
        className="border-t border-veld-primary/10 bg-veld-forest/10"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2
            id="waitlist-heading"
            className="text-3xl sm:text-4xl font-semibold tracking-tight text-veld-surface"
          >
            Get early access
          </h2>
          <p className="mt-4 text-veld-pale/70 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            We&rsquo;re rolling access to Veld out in waves. Join the waitlist
            to get testnet credentials, documentation previews, and integration
            support.
          </p>
          <div className="mt-10 flex justify-center">
            <WaitlistForm />
          </div>
        </div>
      </section>
    </>
  );
}
