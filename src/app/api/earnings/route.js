import { getRiderEarnings } from "../../../lib/script-connect/earnings";

export async function GET(req) {
  try {
    const id = new URL(req.url).searchParams.get("id")?.trim();
    if (!id) {
      return Response.json({ error: "Missing id" }, { status: 400 });
    }

    const rows = await getRiderEarnings(id);
    return Response.json({ rows });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}