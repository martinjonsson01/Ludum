document.addEventListener("DOMContentLoaded", function (event) {
    var tabBar = mdc.tabBar.MDCTabBar.attachTo(document.querySelector('.mdc-tab-bar'));
    tabBar.activateTab(0);
});
function clickStream(){
    document.querySelector("#flöde").style.display="block";
    document.querySelector("#uppgifter").style.display="none";
    document.querySelector("#kursmatris").style.display="none";
    document.querySelector("#prov").style.display="none";
    }
function clickClasswork(){
    document.querySelector("#flöde").style.display="none";
    document.querySelector("#uppgifter").style.display="block";
    document.querySelector("#kursmatris").style.display="none";
    document.querySelector("#prov").style.display="none";
}
function clickGradings(){
    document.querySelector("#flöde").style.display="none";
    document.querySelector("#uppgifter").style.display="none";
    document.querySelector("#kursmatris").style.display="block";
    document.querySelector("#prov").style.display="none";
}
function clickTests(){
    document.querySelector("#flöde").style.display="none";
    document.querySelector("#uppgifter").style.display="none";
    document.querySelector("#kursmatris").style.display="none";
    document.querySelector("#prov").style.display="block";
}