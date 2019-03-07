document.addEventListener("DOMContentLoaded", function (event) {
    console.log("initializing javascript");
    var tabBar = mdc.tabBar.MDCTabBar.attachTo(document.querySelector('.mdc-tab-bar'));
    tabBar.activateTab(0);
});
function clickStream(){
    console.log("hejehj")
    document.querySelector("#flöde").style.display="block";
    document.querySelector("#uppgifter").style.display="none";
    document.querySelector("#kursmatris").style.display="none";
    document.querySelector("#prov").style.display="none";
    }
function clickClasswork(){
    console.log("hejehj")
    document.querySelector("#flöde").style.display="none";
    document.querySelector("#uppgifter").style.display="block";
    document.querySelector("#kursmatris").style.display="none";
    document.querySelector("#prov").style.display="none";
}
function clickGradings(){
    console.log("hejehj")
    document.querySelector("#flöde").style.display="none";
    document.querySelector("#uppgifter").style.display="none";
    document.querySelector("#kursmatris").style.display="block";
    document.querySelector("#prov").style.display="none";
}
function clickTests(){
    console.log("hejehj")
    document.querySelector("#flöde").style.display="none";
    document.querySelector("#uppgifter").style.display="none";
    document.querySelector("#kursmatris").style.display="none";
    document.querySelector("#prov").style.display="block";
}