import { WEEK_CARD_NAME_MAX_LENGTH } from "@/config/app.config";

export function truncateName(
  name: string,
  maxLength: number = WEEK_CARD_NAME_MAX_LENGTH
): string {
  if (name.length <= maxLength) return name;
  return name.slice(0, maxLength).trimEnd() + "…";
}
