let closingIcon = document.querySelector(".header__closingIconContainer");
let hamburgerIcon = document.querySelector(".header__hamburgerIconContainer");
let header = document.querySelector("header");
let nav = document.querySelector("nav");
let contentWrapper = document.querySelector(".body__contentWrapper");
let allNavLi = document.querySelectorAll("li");
let lastNavLi = allNavLi[allNavLi.length - 1];

let main = document.querySelector("main");
let heroImg = document.querySelector(".main__heroImg")
let mobileHeroImgs = ["./images/mobile-image-hero-1.jpg", "./images/mobile-image-hero-2.jpg", "./images/mobile-image-hero-3.jpg"];
let desktopHeroImgs = ["./images/desktop-image-hero-1.jpg", "./images/desktop-image-hero-2.jpg", "./images/desktop-image-hero-3.jpg"];
let currentScreenType = "";

let heroTextContainer = document.querySelector(".main__heroTextSection");
let heroImgContainer = document.querySelector(".main__heroImgSection");
let imgSliders = document.querySelectorAll(".main__imgSlider");

// Dynamically changes which images are displayed (Mobile vs. Desktop)
function handleImageType(){
  if(window.innerWidth <= 425){
    heroImg.setAttribute("src", "./images/mobile-image-hero-1.jpg");
    currentScreenType = "mobile";
  }
  else{
    heroImg.setAttribute("src", "./images/desktop-image-hero-1.jpg");
    currentScreenType = "desktop";
  }
}

// Handles image slider functionality
function handleImageChange(event){
  let heroImgSrc = heroImg.getAttribute("src");
  let heroImgIndex = parseInt(heroImgSrc.slice(0, -4).charAt(heroImgSrc.length - 5));

  if(event.target.classList[1] === "backArrow" && heroImgIndex != 1){
    heroImgIndex -= 1;
    heroImgIndex = heroImgIndex.toString();
    heroImg.setAttribute("src", `./images/${currentScreenType}-image-hero-${heroImgIndex}.jpg`);
  }
  else if(event.target.classList[1] === "backArrow" && heroImgIndex == 1){
    heroImgIndex = 3;
    heroImgIndex = heroImgIndex.toString();
    heroImg.setAttribute("src", `./images/${currentScreenType}-image-hero-${heroImgIndex}.jpg`);
  }
  
  if(event.target.classList[1] === "forwardArrow" && heroImgIndex != 3){
    heroImgIndex += 1;
    heroImgIndex = heroImgIndex.toString();
    heroImg.setAttribute("src", `./images/${currentScreenType}-image-hero-${heroImgIndex}.jpg`);
  }
  else if(event.target.classList[1] === "forwardArrow" && heroImgIndex == 3){
    heroImgIndex = 1;
    heroImgIndex = heroImgIndex.toString();
    heroImg.setAttribute("src", `./images/${currentScreenType}-image-hero-${heroImgIndex}.jpg`);
  }
}

// Event-Listeners for image slider (Tested: Success)
main.addEventListener("click", (e) => {
  if(e.target.classList[0] === "imgSlider__arrowContainer"){
    handleImageChange(e);
  }
});

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
    imgSliders[1].setAttribute("inert", true);
    imgSliders[1].style.display = "none";
    imgSliders[0].removeAttribute("inert");
    imgSliders[0].style.display = "flex";
  }
  else{
    imgSliders[0].setAttribute("inert", true);
    imgSliders[0].style.display = "none";
    imgSliders[1].removeAttribute("inert");
    imgSliders[1].style.display = "flex";
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