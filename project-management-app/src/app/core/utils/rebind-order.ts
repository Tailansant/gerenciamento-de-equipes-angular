export const rebindOrder = <T>(arr: Array<T>) => {
  return arr.map((item, index) => {
    return { ...item, order: index };
  });
};
