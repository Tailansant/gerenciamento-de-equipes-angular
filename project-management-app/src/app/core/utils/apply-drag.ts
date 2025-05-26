import { DropResult } from 'ngx-smooth-dnd';

export const applyDrag = <T>(arr: T[], dragResult: DropResult) => {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;

  const result = [...arr];
  let itemToAdd = payload;

  if (removedIndex !== null) {
    [itemToAdd] = result.splice(removedIndex, 1);
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
  }

  return result;
};
