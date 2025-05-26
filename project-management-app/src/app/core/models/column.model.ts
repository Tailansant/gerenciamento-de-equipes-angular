export interface Column {
  title: string;
  order: number;
  boardId?: string;
}

export interface PartialColumnWithOrder {
  _id: string;
  order: number;
}
