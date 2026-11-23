import "server-only";

console.log("token:", JSON.stringify(process.env.APPS_SCRIPT_TOKEN));

export async function callScript<T>(
  action: string,
  payload: Record<string, unknown> = {}
): Promise<T> {
  const res = await fetch(process.env.APPS_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({
      action,
      token: process.env.APPS_SCRIPT_TOKEN,
      ...payload,
    }),
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Apps Script request failed");

  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data as T;
}