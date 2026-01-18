export type ColumnType = "To Do" | "In Progress" | "Done";
export type Priority = "red" | "orange" | "yellow";

export interface Card {
  id: number;
  title: string;
  description: string;
  priority?: Priority;
}

export interface Column {
  id: number;
  title: ColumnType;
  cards: Card[];
}
