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

// Copied from:
// https://stackoverflow.com/questions/22148885/converting-youtube-data-api-v3-video-duration-format-to-seconds-in-javascript-no
export function parseISO8601Duration(duration) {
  const match = duration.match(/P(\d+Y)?(\d+W)?(\d+D)?T(\d+H)?(\d+M)?(\d+S)?/);
  // An invalid case won't crash the app.
  if (!match) {
    //console.error(`Invalid YouTube video duration: ${duration}`);
    return 0;
  }
  const [
    years,
    weeks,
    days,
    hours,
    minutes,
    seconds
  ] = match.slice(1).map(_ => _ ? parseInt(_.replace(/\D/, "")) : 0);
  return (((years * 365 + weeks * 7 + days) * 24 + hours) * 60 + minutes) * 60 + seconds;
}

export async function addGoogleClientLibraryScript() {
  return new Promise((resolve, reject) => {
    const element = document.getElementsByTagName("script")[0];
    const firstScriptElement = element;
    // Resolve immediately if script already exists.
    if (firstScriptElement.id === "google-login") resolve();
    let js = element;
    js = document.createElement("script");
    js.id = "google-login";
    js.src = "https://apis.google.com/js/api.js";
    if (firstScriptElement && firstScriptElement.parentNode) {
      firstScriptElement.parentNode.insertBefore(js, firstScriptElement);
    }
    else {
      document.head.appendChild(js);
    }
    js.onload = () => resolve();
    js.oncancel = () => reject();
  });
}

export function parseGoogleUser(googleUser) {
  /*
    Offer renamed response keys to names that match use.
  */
  const basicProfile = googleUser.getBasicProfile();
  const authResponse = googleUser.getAuthResponse();
  googleUser.googleId = basicProfile.getId();
  googleUser.tokenObj = authResponse;
  googleUser.tokenId = authResponse.id_token;
  googleUser.accessToken = authResponse.access_token;
  googleUser.profileObj = {
    googleId: basicProfile.getId(),
    imageUrl: basicProfile.getImageUrl(),
    email: basicProfile.getEmail(),
    name: basicProfile.getName(),
    givenName: basicProfile.getGivenName(),
    familyName: basicProfile.getFamilyName()
  };

  return googleUser;
}

export function getNameFromMimeType(metadata) {
  if (!metadata) return "Laddar...";
  switch (metadata.mimeType) {
    case "application/vnd.google-apps.audio":
      return "Ljudfil";
    case "application/vnd.google-apps.document":
      return "Google Dokument";
    case "application/vnd.google-apps.drawing":
      return "Google Målning";
    case "application/vnd.google-apps.file":
      return "Google Drive Fil";
    case "application/vnd.google-apps.folder":
      return "Google Drive Mapp";
    case "application/vnd.google-apps.form":
      return "Google Formulär";
    case "application/vnd.google-apps.map":
      return "Google Karta";
    case "application/vnd.google-apps.photo":
      return "Foto";
    case "application/vnd.google-apps.presentation":
      return "Google Presentation";
    case "application/vnd.google-apps.script":
      return "Google Apps Skript";
    case "application/vnd.google-apps.site":
      return "Google Site";
    case "application/vnd.google-apps.spreadsheet":
      return "Google Kalkylark";
    case "application/vnd.google-apps.unknown":
      return "Okänt";
    case "application/vnd.google-apps.video":
      return "Video";
    default:
      return "Fil";
  }
}