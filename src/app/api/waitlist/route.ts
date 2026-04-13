import { NextRequest, NextResponse } from "next/server";

/**
 * Waitlist signup endpoint.
 *
 * Requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in env.
 * Table: waitlist (email TEXT UNIQUE, created_at TIMESTAMPTZ DEFAULT now(), source TEXT)
 *
 * Until Supabase is configured, returns a success stub so the form works.
 */
export async function POST(request: NextRequest) {
  try {
    const { email, source } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email required" },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      // Stub mode — log and return success until DB is configured
      console.log("[waitlist-stub]", email, source ?? "direct");
      return NextResponse.json({ success: true });
    }

    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error } = await supabase.from("waitlist").upsert(
      {
        email: email.toLowerCase().trim(),
        source: source ?? "direct",
      },
      { onConflict: "email" }
    );

    if (error) {
      console.error("[waitlist]", error);
      return NextResponse.json(
        { error: "Failed to join waitlist" },
        { status: 500 }
      );
    }

    // TODO: Trigger Brevo auto-responder email here once API key is configured

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
