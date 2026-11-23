import { EARNINGS_BREAKDOWN } from "../utils/earnings-breakdown";

export const CURRENCY_LABEL = "";   // e.g. "KWD", "AED", "SAR"
export const MONEY_DECIMALS = 2;    // KWD uses 3

const moneyFormat = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: MONEY_DECIMALS,
  maximumFractionDigits: MONEY_DECIMALS,
});
const countFormat = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

const isEmpty = (v) => v === null || v === undefined || v === "";

export function isZero(value) {
  if (isEmpty(value)) return true;
  const n = Number(value);
  return !Number.isNaN(n) && n === 0;
}

export function formatValue(value, type = "text") {
  if (isEmpty(value)) return "—";

  if (type === "money" || type === "count") {
    const n = Number(value);
    if (Number.isNaN(n)) return String(value); // sheet had text, show as is
    return type === "money"
      ? `${moneyFormat.format(n)}${CURRENCY_LABEL ? " " + CURRENCY_LABEL : ""}`
      : countFormat.format(n);
  }

  return String(value);
}

// Turns one raw sheet row into sections ready to render
export function buildEarningsSections(row) {
  return EARNINGS_BREAKDOWN.map((section) => {
    const fields = section.fields
      .filter(
        (f) =>
          f.key in row &&
          (!section.hideZero || f.bold || !isZero(row[f.key]))
      )
      .map((f) => ({
        key: f.key,
        label: f.label || f.key,
        value: formatValue(row[f.key], f.type || section.defaultType),
        bold: !!f.bold,
      }));

    return {
      id: section.id,
      title: section.title,
      layout: section.layout,
      fields,
    };
  }).filter((section) => section.fields.length > 0);
}