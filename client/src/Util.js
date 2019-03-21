export function findWithAttr(array, attr, value) {
  for (var i = 0; i < array.length; i += 1) {
    if (array[i][attr] === value) {
      return i;
    }
  }
  return -1;
}

export function writeText(str) {
  return new Promise(function (resolve, reject) {
    var success = false;
    function listener(e) {
      e.clipboardData.setData("text/plain", str);
      e.preventDefault();
      success = true;
    }
    document.addEventListener("copy", listener);
    document.execCommand("copy");
    document.removeEventListener("copy", listener);
    success ? resolve() : reject();
  });
};