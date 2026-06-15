"use strict";

const body = document.body;
const mobileOpenButton = document.querySelector(".menu__btn");
const mobileMenu = document.querySelector(".nav-mobile");
const mobileCloseButton = document.querySelector(".nav-mobile__btn_close");
const navLists = document.querySelectorAll("[data-nav-list]");
const scrollLinks = document.querySelectorAll("[data-scroll-to]");


const videoOverlayButton = document.querySelector(".button_gray");
const videoContainer = document.querySelector(".hero__video");



function openMobileMenu() {
  if (!mobileMenu || !mobileOpenButton) return;

  mobileMenu.classList.add("nav-mobile_active");
  body.classList.add("hidden");
  mobileMenu.setAttribute("aria-hidden", "false");
  mobileOpenButton.setAttribute("aria-expanded", "true");
}

function closeMobileMenu() {
  if (!mobileMenu || !mobileOpenButton) return;

  mobileMenu.classList.remove("nav-mobile_active");
  body.classList.remove("hidden");
  mobileMenu.setAttribute("aria-hidden", "true");
  mobileOpenButton.setAttribute("aria-expanded", "false");
}

function clearActiveNavItems() {
  navLists.forEach((list) => {
    const items = list.querySelectorAll(".menu-links__link");
    items.forEach((item) => item.classList.remove("menu-links__link_active"));
  });
}

function setActiveNavItem(targetId) {
  navLists.forEach((list) => {
    const activeLink = list.querySelector(`[data-scroll-to="${targetId}"]`);

    if (!activeLink) return;

    const parentItem = activeLink.closest(".menu-links__link");
    if (parentItem) {
      parentItem.classList.add("menu-links__link_active");
    }
  });
}

function scrollToSection(targetId) {
  const section = document.getElementById(targetId);
  console.log(section)
  if (!section) return;

  const header = document.querySelector(".header");
  const headerHeight = header ? header.offsetHeight : 0;
  const sectionTop = section.getBoundingClientRect().top + window.scrollY;
  const offsetTop = Math.max(sectionTop - headerHeight - 16, 0);

  window.scrollTo({
    top: offsetTop,
    behavior: "smooth",
  });
}

function handleScrollLinkClick(event) {
  const link = event.currentTarget;
  const targetId = link.dataset.scrollTo;

  if (!targetId) return;

  event.preventDefault();

  clearActiveNavItems();
  setActiveNavItem(targetId);
  scrollToSection(targetId);
  closeMobileMenu();
}

function hideVideoOverlay() {
  if (!videoOverlayButton) return;
  videoOverlayButton.classList.add("button_active");
}

if (mobileOpenButton) {
  mobileOpenButton.addEventListener("click", openMobileMenu);
}

if (mobileCloseButton) {
  mobileCloseButton.addEventListener("click", closeMobileMenu);
}

if (mobileMenu) {
  mobileMenu.addEventListener("click", (event) => {
    if (event.target === mobileMenu) {
      closeMobileMenu();
    }
  });
}

scrollLinks.forEach((link) => {
  link.addEventListener("click", handleScrollLinkClick);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileMenu();
  }
});

if (videoOverlayButton) {
  videoOverlayButton.addEventListener("click", hideVideoOverlay);
}
if (videoContainer) {

  videoContainer.addEventListener("click", (event) => {
    const schoolVideo = videoContainer.querySelector('#school-video')
    if(schoolVideo.paused){
      schoolVideo.play()
      hideVideoOverlay();
    }else{
      schoolVideo.pause()
      videoOverlayButton.classList.remove("button_active");
    }
  });
}

 videoContainer.querySelector('#school-video').addEventListener('ended',(e)=>{
      videoOverlayButton.classList.remove("button_active");
  })