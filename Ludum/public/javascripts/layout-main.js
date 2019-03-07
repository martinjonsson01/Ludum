/**
 * The Sign-In client object.
 */
var auth2;

/**
 * The Sign-In modal dialog.
 */
var signInDialog;

/**
 * Initializes the Sign-In client.
 */
var initClient = function () {
    gapi.load('auth2', function () {
        /**
         * Retrieve the singleton for the GoogleAuth library and set up the
         * client.
         */
        auth2 = gapi.auth2.init({
            client_id: '425892769172-0jb5mo5gm07avnjraabf75pkula2uv65.apps.googleusercontent.com'
        });

        console.log("Checking sign-in state in 1 second...");
        // Wait for 1000ms before checking if user is signed in. This allows the auto-sign in to happen before the check.
        setTimeout(() => {
            if (auth2.isSignedIn.get()) {
                console.log("User is already signed in.");
            } else {
                console.log("User is not signed in.");
                signInDialog.open();
            }
        }, 1000);
    });
};

/**
 * Handle successful sign-ins.
 */
var onSignIn = function (user) {
    var profile = user.getBasicProfile();
    console.log('Successfully signed in with Google OAuth2!');
    console.log('ID: ' + profile.getId()); // Do not send to backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    // Close dialog.
    signInDialog.close();

    // Update account surfaces.
    document.querySelector("#account-image").src = profile.getImageUrl();
    document.querySelector("#account-menu-surface-name").innerHTML = profile.getName();
    document.querySelector("#account-menu-surface-email").innerHTML = profile.getEmail();
};

/**
 * Sign out the user.
 */
function signOut() {
    //var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');

        // Update profile picture.
        document.querySelector("#account-image").src = "";
        document.querySelector("#account-menu-surface-name").innerHTML = "";
        document.querySelector("#account-menu-surface-email").innerHTML = "";

        signInDialog.open();
    });
}

/**
 * Handle sign-in failures.
 */
var onFailure = function (error) {
    console.log(error);
};

var initComponents = function () {
    signInDialog = mdc.dialog.MDCDialog.attachTo(document.querySelector('.mdc-dialog'));
    signInDialog.scrimClickAction = "";
    signInDialog.escapeKeyAction = "";
    const list = mdc.list.MDCList.attachTo(document.querySelector('.mdc-list'));
    list.listElements.map((listItem) => { mdc.ripple.MDCRipple.attachTo(listItem) });

    Barba.Dispatcher.on("newPageReady", function (currentStatus, oldStatus, container) {
        console.log("New page ready!");
        var titleText = container.querySelector('title').innerHTML;
        document.querySelector('title').innerHTML = titleText;

        var titleTextWithoutLudum = titleText.split(' - ')[1];
        document.querySelector('#page-title').innerText = titleTextWithoutLudum;

        var list = mdc.list.MDCList.attachTo(document.querySelector('.mdc-list'));
        list.listElements.map((listItem) => { mdc.ripple.MDCRipple.attachTo(listItem) });
    });
};

var toggleAccountMenuSurface = function () {
    var menuSurface = document.querySelector("#account-menu-surface");
    if (menuSurface.style.display === "grid") {
        menuSurface.style.display = "none";
    } else {
        menuSurface.style.display = "grid";
    }
};

/**
 * Initialize auth client and material design components on DOMContentLoaded.
 */
document.addEventListener("DOMContentLoaded", function (event) {
    initComponents();
});