import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const MAKE_WEBHOOK = "https://hook.eu1.make.com/o58hijdhxqtxq0a8oaba4wcpm329lfz6"; // <-- Dán URL thật vào đây

serve(async (req) => {
  try {
    const body = await req.json();

    // Log ra cho chắc
    console.log("Supabase webhook received:", body);

    // Forward sang Make
    const res = await fetch(MAKE_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    console.log("Sent to Make, status:", res.status);

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("ERROR:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
