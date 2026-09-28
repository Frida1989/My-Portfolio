var yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Mobile menu
var toggle = document.querySelector(".nav__toggle");
var links = document.querySelector("[data-nav]");

if (toggle && links) {
  toggle.addEventListener("click", function () {
    var open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

// Resume modal window
var openResumeBtn = document.getElementById("openResume");
var resumeModal = document.getElementById("resume-modal");
var resumeClose = resumeModal && resumeModal.querySelector(".modal__close");
var resumeOverlay = resumeModal && resumeModal.querySelector(".modal__overlay");

function openResumeModal(e) {
  if (e && e.preventDefault) e.preventDefault();
  if (!resumeModal) return;
  resumeModal.classList.add("is-open");
  resumeModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  if (resumeClose && resumeClose.focus) resumeClose.focus();
}

function closeResumeModal() {
  if (!resumeModal) return;
  resumeModal.classList.remove("is-open");
  resumeModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (openResumeBtn && openResumeBtn.focus) openResumeBtn.focus();
}

if (openResumeBtn) openResumeBtn.addEventListener("click", openResumeModal);
if (resumeClose) resumeClose.addEventListener("click", closeResumeModal);
if (resumeOverlay) resumeOverlay.addEventListener("click", closeResumeModal);

document.addEventListener("keydown", function (ev) {
  var k = ev.key || ev.keyCode;
  if (
    (k === "Escape" || k === "Esc" || k === 27) &&
    resumeModal &&
    resumeModal.classList.contains("is-open")
  ) {
    closeResumeModal();
  }
});

// Respect reduced-motion preferences for the project reel.
var projectVideos = document.querySelectorAll(".project__thumb--video video");
var reducedMotion =
  typeof window !== "undefined" && window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : null;

function syncProjectVideoMotion() {
  for (var i = 0; i < projectVideos.length; i++) {
    if (reducedMotion && reducedMotion.matches) {
      projectVideos[i].pause();
    } else {
      var playPromise = projectVideos[i].play();
      if (playPromise && playPromise.catch) {
        playPromise.catch(function () {});
      }
    }
  }
}

syncProjectVideoMotion();

if (reducedMotion) {
  if (reducedMotion.addEventListener) {
    reducedMotion.addEventListener("change", syncProjectVideoMotion);
  } else if (reducedMotion.addListener) {
    reducedMotion.addListener(syncProjectVideoMotion);
  }
}
