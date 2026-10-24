// Convert stored dates such as "2026-02-01T00:00:00.000Z" to the
// YYYY-MM format expected by HTML month inputs.
export const toMonthInput = (value) => {
  if (!value) return "";

  if (typeof value === "string") {
    const match = value.match(/^(\d{4})-(\d{2})/);
    if (match) return `${match[1]}-${match[2]}`;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
};
