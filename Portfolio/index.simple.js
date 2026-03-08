// Simple JS: year, nav toggle, resume link (keeps behavior minimal)
document.getElementById("year").textContent = new Date().getFullYear();

// nav toggle (mobile)
document.querySelector(".nav-toggle")?.addEventListener("click", function () {
  document.querySelector(".nav-links")?.classList.toggle("open");
});

// resume open — simple scroll into view (no modal complexity)
document.getElementById("openResume")?.addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("resume")?.scrollIntoView({ behavior: "smooth" });
});

// contact form: prevent real submit for demo
document
  .querySelector(".contact-form")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Tack! Meddelandet skickades (demo).");
  });
