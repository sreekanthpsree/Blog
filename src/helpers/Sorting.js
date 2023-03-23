export function sort(data) {
  data.sort(function (a, b) {
    var keyA = a.createdDate,
      keyB = b.createdDate;
    if (keyA < keyB) return 1;
    if (keyA > keyB) return -1;
    return 0;
  });
}
