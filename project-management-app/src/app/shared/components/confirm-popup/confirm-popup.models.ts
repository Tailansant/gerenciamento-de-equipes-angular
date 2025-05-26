export enum ItemType {
  board = 'board',
  column = 'column',
  task = 'task',
  user = 'user',
  board_RU = 'доска',
  column_RU = 'колонку',
  task_RU = 'задачу',
  user_RU = 'пользователь',
}

export interface ConfirmData {
  message?: string; 
  id?: string; 
  itemType?: ItemType;
}
