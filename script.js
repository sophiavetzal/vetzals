document.addEventListener("DOMContentLoaded", function () {
  const dotCanvas = document.getElementById("dot-canvas");
  const dotCtx = dotCanvas.getContext("2d");
  const aboutText = document.querySelector(".about-text");
  const header = document.querySelector(".header");
  const dropdown = document.querySelector(".dropdown");

  dotCanvas.width = window.innerWidth;
  dotCanvas.height = window.innerHeight;

  let scale = 1;
  const minScale = 0.001;
  let centerX = dotCanvas.width * 0.637;
  let centerY = dotCanvas.height * 0.34;

  let inactivityTimer;
  let animationStarted = false;
  let lockScroll = true;
  let animationTriggered = false;

  // =========================
  // ABOUT PAGE / TEXT ANIMATION
  // =========================

  function showAllText() {
    aboutText.classList.add("show");
    header.classList.add("inverted");

    if (dropdown) {
      dropdown.classList.add("inverted");
    }

    const elementsToShow = [
      document.querySelector(".center-text"),
      document.querySelector(".left-text"),
      document.querySelector(".about-image"),
      document.querySelector(".bottom-left-text"),
      document.querySelector(".courses-label"),
    ];

    elementsToShow.forEach((element, index) => {
      if (element) {
        setTimeout(() => {
          element.classList.add("show");
        }, index * 400); // 0.4 seconds between each fade-in
      }
    });
  }

  // =========================
  // DOT ANIMATION
  // =========================
/*
  function startAnimation() {
    if (animationStarted) return;

    animationStarted = true;
    animationTriggered = true;

    scale = 1;

    dotCanvas.style.display = "block";

    dotCtx.clearRect(
      0,
      0,
      dotCanvas.width,
      dotCanvas.height
    );

    function draw() {
      dotCtx.clearRect(
        0,
        0,
        dotCanvas.width,
        dotCanvas.height
      );

      // White background
      dotCtx.fillStyle = "white";
      dotCtx.fillRect(
        0,
        0,
        dotCanvas.width,
        dotCanvas.height
      );

      // Black circle
      if (scale > minScale) {
        dotCtx.fillStyle = "black";
      } else {
        dotCtx.fillStyle = "white";
      }

      dotCtx.beginPath();

      const maxDist = Math.sqrt(
        dotCanvas.width ** 2 +
        dotCanvas.height ** 2
      );

      dotCtx.arc(
        centerX,
        centerY,
        scale * maxDist,
        0,
        Math.PI * 2
      );

      dotCtx.fill();

      if (scale > minScale) {
        scale *= 0.95;
        requestAnimationFrame(draw);
      } else {
        showAllText();

        animationStarted = false;
        unlockScrolling();
      }
    }

    draw();
  }

  // =========================
  // INACTIVITY TIMER
  // =========================

  function resetTimer() {
    clearTimeout(inactivityTimer);

    inactivityTimer = setTimeout(() => {
      if (!aboutText.classList.contains("show")) {
        startAnimation();
      }
    }, 9000);
  }

  // =========================
  // SCROLL LOCK
  // =========================

  function unlockScrolling() {
    lockScroll = false;
  }

  // Only prevent wheel scrolling while the intro animation
  // is waiting to start.
  window.addEventListener(
    "wheel",
    (e) => {
      if (!animationTriggered && lockScroll) {
        e.preventDefault();
        startAnimation();
      }
    },
    { passive: false }
  );

  // Only handle touch gestures when they are NOT coming
  // from an interactive element such as video, button, link, etc.
  window.addEventListener(
    "touchstart",
    (e) => {
      if (!animationTriggered && lockScroll) {
        const interactiveElement = e.target.closest(
          "video, button, a, input, textarea, select"
        );

        if (interactiveElement) {
          return;
        }

        e.preventDefault();
        startAnimation();
      }
    },
    { passive: false }
  );

  // Do NOT continuously force the browser back to the top.
  // This can interfere with mobile scrolling/video behavior.
  //
  // Instead, only move to the top when the intro animation
  // is actually being triggered.
  function keepAtTop() {
    if (lockScroll && !animationTriggered) {
      window.scrollTo(0, 0);
    }
  }
*/
  // =========================
  // USER ACTIVITY
  // =========================

  ["mousemove", "keydown", "wheel", "touchstart"].forEach(
    (event) => {
      window.addEventListener(event, resetTimer);
    }
  );

  resetTimer();

  // =========================
  // COURSES CAROUSEL
  // =========================

  const viewport = document.querySelector(".courses-carousel");

  if (viewport) {
    const track = viewport.querySelector(".carousel-track");
    const leftArrow = document.querySelector(".arrow.left");
    const rightArrow = document.querySelector(".arrow.right");

    if (track && leftArrow && rightArrow) {
      const cards = Array.from(track.children);

      if (cards.length > 0) {
        const coursesPerPage = 2;
        let pageIndex = 0;

        function update() {
          const viewportWidth =
            viewport.getBoundingClientRect().width;

          const trackWidth = track.scrollWidth;
          const maxOffset = trackWidth - viewportWidth;

          let offset = pageIndex * viewportWidth;

          if (offset > maxOffset) {
            offset = maxOffset;
          }

          track.style.transform =
            `translateX(-${offset}px)`;
        }

        function computeMaxPage() {
          const viewportWidth =
            viewport.getBoundingClientRect().width;

          const trackWidth = track.scrollWidth;

          return Math.ceil(
            trackWidth / viewportWidth
          ) - 1;
        }

        rightArrow.addEventListener("click", () => {
          const maxPage = computeMaxPage();

          if (pageIndex < maxPage) {
            pageIndex++;
            update();
          }
        });

        leftArrow.addEventListener("click", () => {
          if (pageIndex > 0) {
            pageIndex--;
            update();
          }
        });

        window.addEventListener("resize", () => {
          const maxPage = computeMaxPage();

          if (pageIndex > maxPage) {
            pageIndex = maxPage;
          }

          update();
        });

        update();
      }
    }
  }

  // =========================
  // PROJECTS SECTION
  // =========================

  const tabs = document.querySelectorAll(".tab");
  const contents =
    document.querySelectorAll(".project-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) =>
        t.classList.remove("active")
      );

      contents.forEach((c) =>
        c.classList.remove("active")
      );

      tab.classList.add("active");

      const target =
        tab.getAttribute("data-target");

      const targetElement =
        document.getElementById(target);

      if (targetElement) {
        targetElement.classList.add("active");
      }
    });
  });

  if (tabs.length && contents.length) {
    tabs[0].classList.add("active");
    contents[0].classList.add("active");
  }

  // =========================
  // VIDEO SECTION
  // =========================

  document
    .querySelectorAll(".video-box video")
    .forEach((video) => {

      // Desktop: play when mouse enters
      video.addEventListener("mouseenter", () => {
        video.play().catch(() => {
          // Browser may block autoplay.
        });
      });

      // Desktop: stop when mouse leaves
      video.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0;
      });

      // Mobile: allow normal touch interaction.
      // Do NOT preventDefault() here.
      video.addEventListener("touchstart", () => {
        // Intentionally empty.
        // This prevents our code from interfering
        // with the browser's native video controls.
      }, { passive: true });
    });
});
