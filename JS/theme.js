const $HTML = document.documentElement;
const isDark = window.matchMedia("(prefers-color-cheme:dark)").matches;
if(sessionStorage.getItem("theme")){
    $HTML.dataset.theme= sessionStorage.getItem("theme");
}
else {
    $HTML.dataset.theme = isDark ? "dark": "light";
}