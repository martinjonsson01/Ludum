document.addEventListener("DOMContentLoaded", function (event) {
    console.log("initializing javascript");
    var tabBar = mdc.tabBar.MDCTabBar.attachTo(document.querySelector('.mdc-tab-bar'));
    tabBar.activateTab(0);
});