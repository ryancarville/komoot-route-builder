export const sort = (array, dir) => {
  switch (dir) {
    case '-':
      return array.sort((a, b) => a.id - b.id);
    case '+':
      return array.sort((a, b) => a.id + b.id);
    default:
      return array.sort((a, b) => a.id - b.id);
  }
};