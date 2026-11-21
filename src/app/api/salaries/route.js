export async function GET(req) {
  try {
    const id = new URL(req.url).searchParams.get("id");
    if (!id) return Response.json({ error: "missing id" }, { status: 400 });

    const url = new URL(process.env.APPS_SCRIPT_URL);
    url.searchParams.set("id", id);
    url.searchParams.set("token", process.env.APPS_SCRIPT_TOKEN);

    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();

    if (data.error) return Response.json({ error: data.error }, { status: 400 });
    return Response.json({ rows: data.rows });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}