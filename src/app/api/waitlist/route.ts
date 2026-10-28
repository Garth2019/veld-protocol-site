import { NextResponse } from "next/server";

/**
 * The waitlist is closed. Garth parked it on 17 Oct 2026 and its Supabase backend
 * (hlpyjifgedpxcurqlqbr) no longer exists, so nothing could be stored. Answer 410 Gone,
 * so no sign-up is ever accepted into a void, and read nothing from the request.
 */
const CLOSED = {
  error: "The Veld waitlist is closed and is not accepting sign-ups. Nothing was submitted or stored.",
};

function gone() {
  return NextResponse.json(CLOSED, { status: 410, headers: { "Cache-Control": "no-store" } });
}

export const GET = gone;
export const POST = gone;
