let closingIcon = document.querySelector(".header__closingIconContainer");
let hamburgerIcon = document.querySelector(".header__hamburgerIconContainer");
let header = document.querySelector("header");
let nav = document.querySelector("nav");
let contentWrapper = document.querySelector(".body__contentWrapper");
let allNavLi = document.querySelectorAll("li");
let lastNavLi = allNavLi[allNavLi.length - 1];
let heroImg = document.querySelector(".main__heroImg");
let heroTextContainer = document.querySelector(".main__heroTextSection");
let heroImgContainer = document.querySelector(".main__heroImgSection");
let imgSlider = document.querySelector(".main__imgSlider");

// Dynamically changes which images are displayed (Mobile vs. Desktop)
function handleImageType(){
  if(window.innerWidth <= 425){
    heroImg.setAttribute("src", "./images/mobile-image-hero-1.jpg");
  }
  else{
    heroImg.setAttribute("src", "./images/desktop-image-hero-1.jpg");
  }
}

// Focus trap for mobileNav
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
  nav.removeAttribute("inert");
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
  nav.setAttribute("inert", true);
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

function handleImageSlider(){
  if(window.innerWidth < 1440){
    imgSlider.classList.remove("desktop");
    imgSlider.classList.add("mobile");
  }
  else{
    imgSlider.classList.remove("mobile");
    imgSlider.classList.add("desktop");
  }
}

// Applies default states (if any) upon window resize or upon load incl. eventListeners
function setDefaultStates(){
  handleImageType();
  handleImageSlider();
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
    nav.setAttribute("inert", true);
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
    nav.removeAttribute("inert");
  }
}
window.addEventListener("load", (e) => {
  setDefaultStates(); // Sets inert, displays, opacities etc;
});
window.addEventListener("resize", (e) => {
  setDefaultStates(); // Sets inert, displays, opacities etc;
});