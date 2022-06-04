export const sortUtil = (array, dir) => {
  switch (dir) {
    case "-":
      return array.sort((a, b) => a.id - b.id);
    case "+":
      return array.sort((a, b) => a.id + b.id);
    default:
      return array.sort((a, b) => a.id - b.id);
  }
};
// download file func
export function downloadBlob(blob, fileName) {
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  document.body.appendChild(a);

  a.style.display = "none";
  a.href = url;
  a.download = fileName;
  a.click();

  window.URL.revokeObjectURL(url);
}

// drag reordering
export const dragDropOrdering = (array, dragId, dropId) => {
  const dragBox = array.find((m) => m.id === dragId);
  const dropBox = array.find((m) => m.id === dropId);

  const dragBoxOrder = dragBox.id;
  const dropBoxOrder = dropBox.id;

  return (
    array.map((mark) => {
      // if mark if higher than moved mark and higher than destination mark
      if (mark.id > dragBoxOrder && dropBoxOrder < mark.id) {
        return mark;
      }
      // if mark if higher than moved mark and lower than destination mark
      else if (mark.id > dragBoxOrder && dropBoxOrder > mark.id) {
        mark.id--;
      } // if mark if lower than moved mark and higher or equal to destination mark
      else if (mark.id < dragBoxOrder && dropBoxOrder <= mark.id) {
        mark.id++;
      } // if mark is moved mark
      else if (mark.id === dragBoxOrder) {
        mark.id = dropBoxOrder;
      } // if mark is destination mark
      else if (mark.id === dropBoxOrder) {
        mark.id--;
      }

      // update name if it is not a custom name
      if (mark.name.includes(this.waypointPrefix)) {
        mark.name = `${this.waypointPrefix} ${mark.id}`;
      }

      return mark;
    })
  )
}