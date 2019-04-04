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