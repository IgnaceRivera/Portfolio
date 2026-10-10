/* Civil Engineer Portfolio — modal, carousel, CV interactions */
(function () {
  "use strict";
  document.documentElement.classList.add("js");

  /* ---------- project data (edit these with your real details) ---------- */
  var PROJECTS = {
    p1: {
      eyebrow: "RESIDENTIAL — 2025",
      title: "3 Storey Residential Building",
      desc: "Proposed 3-storey residential building with a lot area of 10x12 m². Approved by the municipal of Quezon City.",
      facts: [
        ["ROLE", "Design Engineer"],
        ["SCOPE", "3-storey house, floor plan, elevation"],
        ["TOOLS", "SketchUp, AutoCAD, D5 Render"],
        ["STATUS", "Completed / Approved by Municipal"],
      ],
      images: ["images/p1-1.jpg", "images/p1-2.jpg", "images/p1-3.jpg"],
      captions: ["Rendered Perspective", "Floor Plan", "Elevation"],
    },
    p2: {
      eyebrow: "RESIDENTIAL — 2024",
      title: "Single Attached Residential",
      desc: "2-storey single attached residential housing. Compliant with the local building codes and regulations with a lot area of 6x10 m².",
      facts: [
        ["ROLE", "Design Engineer / Draftsman"],
        ["SCOPE", "Perspective, Architectural Drawings, Structural Plan, Electrical Plan, Plumbing Plan"],
        ["TOOLS", "SketchUp, AutoCAD, D5 Render"],
        ["STATUS", "Completed / In Construction"]
      ],
      images: ["images/p2-1.jpg", "images/p2-2.jpg", "images/p2-3.jpg", "images/p2-4.jpg", "images/p2-5.jpg", "images/p2-6.jpg", "images/p2-7.jpg"],
      captions: ["Rendered Perspective", "Vicinity Map, Location Map, Contents", "Architectural Drawings", "Structural Plan","General Notes", "Electrical Plan", "Plumbing Plan"],
    },
    p3: {
      eyebrow: "STRUCTURAL / DRAFTING — 2026",
      title: "Precast Shop Drawing",
      desc: "2D Precast Shop Drawing for a high-rise building project based in Singapore. The drawings include structural details, reinforcement details and layouts, and are used for fabrication and construction purposes.",
      facts: [
        ["ROLE", "Design Engineer — AOCON Inc."],
        ["SCOPE", "2D and Isometric Precast Shop Drawing of different components: beamsms, columns, slabs, walls, stairs, and other structural elements"],
        ["TOOLS", "AutoCAD"],
        ["STATUS", "Ongoing / Completed"],
      ],
      images: ["images/p3-1.jpg", "images/p3-2.jpg", "images/p3-3.jpg", "images/p3-4.jpg", "images/p3-5.jpg", "images/p3-6.jpg", "images/p3-7.jpg", "images/p3-8.jpg"],
      captions: ["Sample Drawing", "Sample Drawing", "Sample Drawing", "Sample Drawing", "Sample Drawing", "Sample Drawing", "Sample Drawing", "Sample Drawing"],
    },
    p4: {
      eyebrow: "GEOTECHNICAL / CONSTRUCTION — 2024",
      title: "Subdivision Planning",
      desc: "Real estate development project of a subdivision. The project involves the planning and design of a residential subdivision, including the layout of roads, lots, and amenities.",
      facts: [
        ["ROLE", "Design Engineer / CAD operator"],
        ["SCOPE", "Site Development Plan, Water Line Layout, Drainage Plan, Electrical Posts Layout, Road Section Details, Standard Drainage Details"],
        ["TOOLS", "AutoCAD"],
        ["STATUS", "Completed"],
      ],
      images: ["images/p4-1.jpg", "images/p4-2.jpg", "images/p4-3.jpg", "images/p4-4.jpg", "images/p4-5.jpg", "images/p4-6.jpg"],
      captions: ["Vicinity Map, Subdivision Plan", "Water Line Layout", "Drainage Plan", "Electrical Posts Layout", "Road Section Details", "Standard Drainage Details"],
    },
  };

  var modal = document.getElementById("projectModal");
  var shell = modal.querySelector(".project-modal-shell");
  var closeBtn = document.getElementById("closeProject");
  var prevBtn = document.getElementById("prevBtn");
  var nextBtn = document.getElementById("nextBtn");
  var status = document.getElementById("carouselStatus");
  var heroImg = modal.querySelector(".project-carousel-image");
  var current = 0;
  var total = 0;
  var currentImages = [];
  var lastFocus = null;

  function openProject(id) {
    var p = PROJECTS[id];
    if (!p) return;
    lastFocus = document.activeElement;
    document.getElementById("pmEyebrow").textContent = p.eyebrow;
    document.getElementById("pmTitle").textContent = p.title;
    document.getElementById("pmDesc").textContent = p.desc;
    var facts = document.getElementById("pmFacts");
    facts.innerHTML = "";
    p.facts.forEach(function (f) {
      var div = document.createElement("div");
      div.className = "project-fact";
      div.innerHTML =
        '<div class="project-fact-label">' + f[0] + "</div>" +
        '<div class="project-fact-value">' + f[1] + "</div>";
      facts.appendChild(div);
    });

    // gallery — photos come from the images/ folder (paths set in PROJECTS above)
    currentImages = p.images || [];
    var gallery = document.getElementById("pmGallery");
    gallery.innerHTML = "";
    currentImages.forEach(function (src, i) {
      var item = document.createElement("div");
      item.className = "media-item";
      item.innerHTML =
        '<div style="width:100%;aspect-ratio:16/10;max-height:300px;overflow:hidden">' +
          '<img src="' + src + '" alt="' + p.title + ' — view ' + (i + 1) + '" style="display:block;width:100%;max-width:100%;height:100%;object-fit:cover" onerror="this.remove()">' +
        "</div>" +
        '<div class="media-label">FIG. ' + (i + 1) + " — " + ((p.captions && p.captions[i]) || "") + "</div>";
      gallery.appendChild(item);
    });

    total = currentImages.length;
    goTo(0);
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function goTo(n) {
    current = total > 0 ? (n + total) % total : 0;
    status.textContent = (current + 1) + " / " + total;
    prevBtn.disabled = total <= 1;
    nextBtn.disabled = total <= 1;
    // show the real photo for this slide; a missing file falls back to the drawing-sheet placeholder
    heroImg.onerror = function () { heroImg.src = ""; };
    heroImg.src = currentImages[current] || "";
    heroImg.alt = "Project view " + (current + 1);
    heroImg.classList.remove("carousel-current");
    void heroImg.offsetWidth; // restart animation
    heroImg.classList.add("carousel-current");
  }

  function closeProject() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll(".project").forEach(function (el) {
    el.addEventListener("click", function () {
      openProject(el.getAttribute("data-project"));
    });
  });
  closeBtn.addEventListener("click", closeProject);
  prevBtn.addEventListener("click", function () { goTo(current - 1); });
  nextBtn.addEventListener("click", function () { goTo(current + 1); });
  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeProject();
  });

  /* ---------- CV modal ---------- */
  var cvModal = document.getElementById("cvModal");
  var cvLastFocus = null;
  function openCv() {
    cvLastFocus = document.activeElement;
    cvModal.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeCv() {
    cvModal.classList.remove("open");
    document.body.style.overflow = "";
    if (cvLastFocus) cvLastFocus.focus();
  }
  document.getElementById("openCv").addEventListener("click", function (e) { e.preventDefault(); openCv(); });
  document.getElementById("openCv2").addEventListener("click", function (e) { e.preventDefault(); openCv(); });
  document.getElementById("closeCv").addEventListener("click", closeCv);
  cvModal.addEventListener("click", function (e) {
    if (e.target === cvModal) closeCv();
  });

  /* ---------- scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (
    "IntersectionObserver" in window &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- cursor spotlight on project cards ---------- */
  if (
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    document.querySelectorAll(".project").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty("--mx", (e.clientX - r.left) + "px");
        card.style.setProperty("--my", (e.clientY - r.top) + "px");
      });
    });
  }

  /* ---------- 3D model tabs ---------- */
  // m1 loads with the page; m2 preloads in background after open so switching is instant
  function markReady(pane) {
    if (pane) pane.classList.add("ready");
  }
  document.querySelectorAll(".model-pane iframe").forEach(function (frame) {
    frame.addEventListener("load", function () {
      markReady(frame.closest(".model-pane"));
      var ph = frame.parentElement.querySelector(".model-placeholder");
      if (frame.hasAttribute("src") && frame.getAttribute("src") && ph) ph.remove();
    });
  });
  function preloadModels() {
    document.querySelectorAll('.model-pane iframe[data-src]').forEach(function (frame) {
      frame.src = frame.getAttribute("data-src");
      frame.removeAttribute("data-src");
    });
  }
  if (document.readyState === "complete") {
    setTimeout(preloadModels, 1500);
  } else {
    window.addEventListener("load", function () {
      setTimeout(preloadModels, 1500);
    });
  }
  document.querySelectorAll(".model-tab").forEach(function (tab) {
    tab.addEventListener("click", function () {
      var id = tab.getAttribute("data-model-tab");
      document.querySelectorAll(".model-tab").forEach(function (t) {
        var on = t === tab;
        t.classList.toggle("active", on);
        t.setAttribute("aria-selected", on ? "true" : "false");
      });
      document.querySelectorAll(".model-pane").forEach(function (pane) {
        var on = pane.getAttribute("data-model-pane") === id;
        pane.classList.toggle("active", on);
        if (on) {
          var frame = pane.querySelector("iframe");
          var ph = pane.querySelector(".model-placeholder");
          if (frame && frame.getAttribute("data-src")) {
            frame.src = frame.getAttribute("data-src");
            frame.removeAttribute("data-src");
            if (ph) ph.remove();
          }
        }
      });
    });
  });

  /* ---------- keyboard ---------- */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeProject();
      closeCv();
    }
    if (modal.classList.contains("open")) {
      if (e.key === "ArrowLeft") goTo(current - 1);
      if (e.key === "ArrowRight") goTo(current + 1);
    }
  });
})();
