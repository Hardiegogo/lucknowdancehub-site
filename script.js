/* Lucknow Dance Hub, v5
   Three jobs: the mobile nav toggle, click to load the video facades,
   and one IntersectionObserver for the scroll reveals. No libraries. */

(function () {
  "use strict";

  /* Nav */

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      }
    });
  }

  /* Video facades, click to load */

  function loadVideo(button) {
    var id = button.getAttribute("data-video");
    if (!id) return;

    var frame = document.createElement("iframe");
    frame.className = "video__iframe";
    frame.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0";
    frame.title = button.getAttribute("data-title") || "YouTube video";
    frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    frame.setAttribute("allowfullscreen", "");

    button.replaceWith(frame);
    frame.focus();
  }

  document.querySelectorAll(".facade").forEach(function (button) {
    button.addEventListener("click", function () {
      loadVideo(button);
    });
  });

  /* Scroll reveals */

  var reveals = document.querySelectorAll(".reveal");

  function showAll() {
    reveals.forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  if (!("IntersectionObserver" in window)) {
    showAll();
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    var step = 0;

    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.style.transitionDelay = step * 60 + "ms";
      entry.target.classList.add("is-in");
      observer.unobserve(entry.target);
      step += 1;
    });
  }, { threshold: 0.25, rootMargin: "0px 0px -5% 0px" });

  reveals.forEach(function (el) {
    observer.observe(el);
  });
})();
