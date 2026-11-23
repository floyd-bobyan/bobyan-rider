import { callScript } from "./client";

export type EarningsRow = Record<string, string | number | null>;

export async function getRiderEarnings(riderId: string): Promise<EarningsRow[]> {
  const data = await callScript<{ rows: EarningsRow[] }>("getEarnings", {
    id: riderId,
  });
  return data.rows;
}