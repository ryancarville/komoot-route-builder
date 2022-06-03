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
// download file func
export function downloadBlob(blob, fileName) {
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  document.body.appendChild(a);

  a.style.display = 'none';
  a.href = url;
  a.download = fileName;
  a.click();

  window.URL.revokeObjectURL(url);
}