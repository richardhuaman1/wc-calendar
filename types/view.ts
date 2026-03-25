export type ViewType = "agenda" | "3dias" | "semana";

export interface ViewTab {
  id: ViewType;
  label: string;
  icon: React.ReactNode;
}
