export interface GroupNameParts {
  label: string;
  badge: string;
}

export function parseGroupName(groupName: string): GroupNameParts {
  const parts = groupName.split(" ");
  const badge = parts[parts.length - 1];
  const label = parts.length > 1 ? parts.slice(0, -1).join(" ") : "";

  return { label, badge };
}
