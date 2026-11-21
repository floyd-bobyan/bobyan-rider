// lib/sheets.ts
export type SalaryRow = Record<string, string | number | null>;

export async function getRiderSalaries(riderId: string): Promise<SalaryRow[]> {
  const url = new URL(process.env.APPS_SCRIPT_URL!);
  url.searchParams.set("id", riderId);
  url.searchParams.set("token", process.env.APPS_SCRIPT_TOKEN!);

  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error("Failed to fetch salary data");

  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.rows;
}