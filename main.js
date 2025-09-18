let closingIcon = document.querySelector(".header__closingIconContainer");
let hamburgerIcon = document.querySelector(".header__hamburgerIconContainer");
let header = document.querySelector("header");
let nav = document.querySelector("nav");
let contentWrapper = document.querySelector(".body__contentWrapper");
let allNavLi = document.querySelectorAll("li");
let lastNavLi = allNavLi[allNavLi.length - 1];

function mobileNavFocusTrap(){

}
lastNavLi.addEventListener("keydown", (e) => {
  if(e.key === "Tab" && window.innerWidth <= 1024){
    e.preventDefault();
    closingIcon.focus();
  }
});

function handleNavActive(){
  nav.classList.add("active");
  hamburgerIcon.setAttribute("inert", true);
  contentWrapper.classList.add("filterActive");
  closingIcon.focus();
}
// Event listeners for hamburgerIcon
hamburgerIcon.addEventListener("click", () => {
  handleNavActive();
});
hamburgerIcon.addEventListener("keydown", (e) => {
  if(e.key === "Enter" || e.key === " "){
    e.preventDefault();
    handleNavActive();
  }
});

function handleNavInactive(){
  nav.classList.remove("active");
  hamburgerIcon.removeAttribute("inert");
  contentWrapper.classList.remove("filterActive");
  hamburgerIcon.focus();
}
// Event listeners for hamburgerIcon
closingIcon.addEventListener("click", () => {
  handleNavInactive();
});
closingIcon.addEventListener("keydown", (e) => {
  if(e.key === "Enter" || e.key === " "){
    e.preventDefault();
    handleNavInactive();
  }
});

// Applies default states (if any) upon window resize or upon load incl. eventListeners
function setDefaultStates(){
  if(window.innerWidth <= 1024){
    // Show hamburgerIcon
    hamburgerIcon.style.display = "block";
    hamburgerIcon.removeAttribute("inert");
    // Show closingIcon
    closingIcon.style.display = "block";
    closingIcon.removeAttribute("inert");

    // Remove Desktop Header & Nav class and add Mobile
    header.classList.remove("desktopHeader");
    header.classList.add("mobileHeader");

    nav.classList.remove("desktopNav");
    nav.classList.add("mobileNav");
  }
  else{
    // Hide hamburgerIcon
    hamburgerIcon.style.display = "none";
    hamburgerIcon.setAttribute("inert", true);
    // Hide closingIcon
    closingIcon.style.display = "none";
    closingIcon.setAttribute("inert", true);

    // Close mobileNav in case it is open
    handleNavInactive();

    // Remove Mobile Header & Nav class and add Desktop
    header.classList.remove("mobileHeader");
    header.classList.add("desktopHeader");

    nav.classList.remove("mobileNav");
    nav.classList.add("desktopNav");
  }
}
window.addEventListener("load", (e) => {
  setDefaultStates(); // Sets inert, displays, opacities etc;
});
window.addEventListener("resize", (e) => {
  setDefaultStates(); // Sets inert, displays, opacities etc;
});