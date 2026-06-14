/* House of Arras — 100 Points : interactions */
(function () {
  "use strict";

  /* ---- Sticky header background on scroll ---- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile nav toggle ---- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }

  /* ---- Scroll reveal + on-view allocation bars ---- */
  var revealEls = document.querySelectorAll(".reveal");
  var allocFills = document.querySelectorAll(".alloc-fill");

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          // animate allocation bars if present
          if (entry.target.classList.contains("alloc")) {
            entry.target.querySelectorAll(".alloc-fill").forEach(function (f) {
              f.style.width = (f.getAttribute("data-pct") || "0") + "%";
            });
          }
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    revealEls.forEach(function (el) { io.observe(el); });
    document.querySelectorAll(".alloc").forEach(function (el) { io.observe(el); });
  } else {
    // Fallback: show everything
    revealEls.forEach(function (el) { el.classList.add("in"); });
    allocFills.forEach(function (f) { f.style.width = (f.getAttribute("data-pct") || "0") + "%"; });
  }

  /* ---- Champagne bubbles (hero only) ---- */
  var bubbleHost = document.querySelector(".bubbles");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (bubbleHost && !reduceMotion) {
    var COUNT = 26;
    for (var i = 0; i < COUNT; i++) {
      var b = document.createElement("span");
      b.className = "bubble";
      var size = 3 + Math.random() * 9;
      b.style.width = size + "px";
      b.style.height = size + "px";
      b.style.left = Math.random() * 100 + "%";
      b.style.animationDuration = 7 + Math.random() * 9 + "s";
      b.style.animationDelay = Math.random() * 10 + "s";
      bubbleHost.appendChild(b);
    }
  }

  /* ---- Current year in footer ---- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
