var yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Mobile nav toggle
var toggle = document.querySelector(".nav__toggle");
var links = document.querySelector("[data-nav]");

if (toggle && links) {
  toggle.addEventListener("click", function () {
    var open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

// Resume modal
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

// Image lightbox for artifacts gallery
var imgModal = document.getElementById("img-modal");
var imgModalImg = imgModal && document.getElementById("img-modal-img");
var imgModalClose = imgModal && imgModal.querySelector(".img-modal__close");
var imgModalOverlay = imgModal && imgModal.querySelector(".img-modal__overlay");

function openImgModal(src, alt) {
  if (!imgModal || !imgModalImg) return;
  imgModalImg.src = src;
  imgModalImg.alt = alt || "Preview";
  imgModal.classList.add("is-open");
  imgModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  if (imgModalClose && imgModalClose.focus) imgModalClose.focus();
}

function closeImgModal() {
  if (!imgModal) return;
  imgModal.classList.remove("is-open");
  imgModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (imgModalImg) imgModalImg.src = "";
}

// Attach click listeners to thumbnails
var thumbs = document.querySelectorAll(".artifact-thumb");
for (var i = 0; i < thumbs.length; i++) {
  (function (btn) {
    btn.addEventListener("click", function () {
      var src = btn.getAttribute("data-img");
      if (!src) return;
      openImgModal(
        src,
        btn.querySelector("img") && btn.querySelector("img").alt,
      );
    });
  })(thumbs[i]);
}

if (imgModalClose) imgModalClose.addEventListener("click", closeImgModal);
if (imgModalOverlay) imgModalOverlay.addEventListener("click", closeImgModal);

document.addEventListener("keydown", function (ev) {
  var k = ev.key || ev.keyCode;
  if (k === "Escape" || k === "Esc" || k === 27) {
    if (imgModal && imgModal.classList.contains("is-open")) closeImgModal();
    if (orbitOverlay && orbitOverlay.classList.contains("is-open")) closeOrbitPanel();
  }
});
/* =========================
   ORBITAL TIMELINE
========================= */

var orbitNodes = document.querySelectorAll(".orbit__node");
var orbitContents = document.querySelectorAll(".orbit-content");
var orbitOverlay = document.querySelector(".orbit-info--overlay");
var orbitClose = orbitOverlay && orbitOverlay.querySelector(".orbit-info__close");
var orbitWrapper = document.querySelector(".orbit__wrapper--artifact");

function setOrbitPanelPosition(sourceNode) {
  if (!orbitWrapper || !sourceNode) return;

  var wrapperRect = orbitWrapper.getBoundingClientRect();
  var nodeRect = sourceNode.getBoundingClientRect();
  var centerX = nodeRect.left - wrapperRect.left + nodeRect.width / 2;
  var centerY = nodeRect.top - wrapperRect.top + nodeRect.height / 2;

  orbitWrapper.style.setProperty("--panel-x", centerX + "px");
  orbitWrapper.style.setProperty("--panel-y", centerY + "px");
}

function closeOrbitPanel() {
  if (!orbitOverlay) return;
  orbitOverlay.classList.remove("is-open");
  orbitOverlay.setAttribute("aria-hidden", "true");
  for (var i = 0; i < orbitNodes.length; i++) {
    orbitNodes[i].classList.remove("is-active");
  }
  for (var j = 0; j < orbitContents.length; j++) {
    orbitContents[j].classList.remove("is-visible");
  }
}

function openOrbitPanel(targetId, sourceNode) {
  if (!orbitOverlay) return;

  for (var i = 0; i < orbitNodes.length; i++) {
    orbitNodes[i].classList.remove("is-active");
  }
  for (var j = 0; j < orbitContents.length; j++) {
    orbitContents[j].classList.remove("is-visible");
  }

  if (sourceNode) {
    sourceNode.classList.add("is-active");
    setOrbitPanelPosition(sourceNode);
  }

  var targetContent = document.getElementById(targetId);
  if (targetContent) {
    targetContent.classList.add("is-visible");
    orbitOverlay.classList.add("is-open");
    orbitOverlay.setAttribute("aria-hidden", "false");
  }
}

for (var k = 0; k < orbitNodes.length; k++) {
  (function (node) {
    node.addEventListener("click", function () {
      var targetId = node.dataset.orbit;
      var isSameActive = node.classList.contains("is-active");

      if (isSameActive && orbitOverlay && orbitOverlay.classList.contains("is-open")) {
        closeOrbitPanel();
        return;
      }

      openOrbitPanel(targetId, node);
    });
  })(orbitNodes[k]);
}

if (orbitClose) {
  orbitClose.addEventListener("click", closeOrbitPanel);
}
