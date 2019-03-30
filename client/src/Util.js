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
}

export function formatDate(date) {
  var now = new Date();

  // If date is today.
  if (
    now.getFullYear() === date.getFullYear() &&
    now.getMonth() === date.getMonth() &&
    now.getDate() === date.getDate()
  ) {
    var strTime = "idag " + date.toLocaleString("sv-SE", { hour: "2-digit", minute: "2-digit" });
    return strTime;
  }
  else { // If date is not today.
    return date.toLocaleString("sv-SE", { month: "short", day: "numeric" });
  }
}