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

  /* ---- Faux-3D bottle stage (hero) ----
     Three angle-consistent studio renders (left / front / right) are
     crossfaded and the plate tilted in 3D. The pointer "turns" the bottle
     on desktop; scrolling away sweeps it gently for the same depth cue on
     touch devices. */
  var stage = document.querySelector(".bottle-stage");
  if (stage && !reduceMotion) {
    var plate = stage.querySelector(".bottle-plate");
    var views = {};
    stage.querySelectorAll(".bottle-view").forEach(function (v) {
      views[v.getAttribute("data-view")] = v;
      v.classList.remove("is-active");
      v.style.opacity = v.getAttribute("data-view") === "front" ? 1 : 0;
    });

    var hero = document.querySelector(".hero");
    var targetTurn = 0;   // -1 (full left view) … 1 (full right view)
    var turn = 0;
    var pointerActive = false;
    var away = 0;         // 0 at top, 1 once the hero has scrolled out
    var ticking = false;

    var shown = "front";
    function show(name) {
      if (name === shown || !views[name]) return;
      views[shown].style.opacity = 0;
      views[name].style.opacity = 1;
      shown = name;
    }
    function apply() {
      ticking = false;
      turn += (targetTurn - turn) * 0.09;
      var t = Math.max(-1, Math.min(1, turn));
      // discrete view switch (quick CSS fade) avoids double-exposure ghosting;
      // hysteresis keeps it from flickering at the boundary
      if (t < -0.5) show("left");
      else if (t > 0.5) show("right");
      else if (t > -0.35 && t < 0.35) show("front");
      plate.style.setProperty("--tilt", t.toFixed(4));
      plate.style.setProperty("--lift", (away * 0.8).toFixed(4));
      plate.style.setProperty("--away", away.toFixed(4));
      if (Math.abs(targetTurn - turn) > 0.002) queue();
    }
    function queue() {
      if (!ticking) { ticking = true; requestAnimationFrame(apply); }
    }

    if (hero && window.matchMedia("(hover: hover)").matches) {
      hero.addEventListener("pointermove", function (e) {
        pointerActive = true;
        var r = hero.getBoundingClientRect();
        targetTurn = ((e.clientX - r.left) / r.width) * 2 - 1;
        queue();
      });
      hero.addEventListener("pointerleave", function () {
        pointerActive = false;
        targetTurn = 0;
        queue();
      });
    }

    window.addEventListener("scroll", function () {
      var h = hero ? hero.offsetHeight : window.innerHeight;
      var p = Math.max(0, Math.min(1, window.scrollY / (h * 0.85)));
      away = p;
      if (!pointerActive) targetTurn = p * 1.3; // gentle turn as the hero leaves
      queue();
    }, { passive: true });

    queue();
  }

  /* ---- Current year in footer ---- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
