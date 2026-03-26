export function parseScore(raw: string): number | undefined {
  if (!raw || raw === "") return undefined;
  const num = parseInt(raw, 10);
  return isNaN(num) ? undefined : num;
}
