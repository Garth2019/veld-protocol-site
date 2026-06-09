"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "done" | "error";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function WaitlistForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [note, setNote] = useState("No spam. One note when cohort 01 opens.");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement | null)?.value.trim() ?? "";

    if (!EMAIL_RE.test(email)) {
      setNote("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setNote("Joining…");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "home" }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setStatus("done");
      setNote("You're on the list — we'll be in touch when cohort 01 opens.");
      form.reset();
    } catch {
      setStatus("error");
      setNote("Something went wrong. Please try again in a moment.");
    }
  }

  const locked = status === "loading" || status === "done";

  return (
    <>
      <form className="waitlist reveal d1" id="waitlistForm" noValidate onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          id="emailInput"
          placeholder="you@buildingsomething.ai"
          aria-label="Email address"
          autoComplete="email"
          disabled={locked}
        />
        <button type="submit" className="btn btn-gold" disabled={locked}>
          {status === "done" ? "Requested ✓" : status === "loading" ? "Joining…" : "Request access"}
        </button>
      </form>
      <div className="form-note reveal d1" id="formNote" role="status" aria-live="polite">
        {note}
      </div>
    </>
  );
}
