document.addEventListener("DOMContentLoaded", function () {

  // =========================
  // INTRO / ABOUT SECTION
  // =========================

  const aboutText = document.querySelector(".about-text");
  const header = document.querySelector(".header");
  const dropdown = document.querySelector(".dropdown");

  // Show the page immediately
  function showAllText() {
    if (aboutText) {
      aboutText.classList.add("show");
    }

    if (header) {
      header.classList.add("inverted");
    }

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
        }, index * 400);
      }
    });
  }

  // Start immediately
  showAllText();


    // =========================
  // COURSES CAROUSEL
  // =========================

  const viewport = document.querySelector(".courses-carousel");

  if (viewport) {
    const track = viewport.querySelector(".carousel-track");
    const cards = track ? track.querySelectorAll(".course") : [];
    const leftArrow = document.querySelector(".arrow.left");
    const rightArrow = document.querySelector(".arrow.right");

    if (track && cards.length && leftArrow && rightArrow) {
      let index = 0; // index of the first visible card

      function getGap() {
        const styles = getComputedStyle(track);
        return parseFloat(styles.columnGap || styles.gap) || 0;
      }

      function cardStep() {
        return cards[0].getBoundingClientRect().width + getGap();
      }

      // 2 on desktop, 1 on phones (works out of the real card width)
      function cardsPerView() {
        return Math.max(
          1,
          Math.round((viewport.clientWidth + getGap()) / cardStep())
        );
      }

      function maxIndex() {
        return Math.max(0, cards.length - cardsPerView());
      }

      function update() {
        index = Math.min(Math.max(index, 0), maxIndex());
        track.style.transform = `translateX(-${index * cardStep()}px)`;

        // dim arrows at the ends
        leftArrow.style.opacity = index === 0 ? 0.3 : 1;
        rightArrow.style.opacity = index >= maxIndex() ? 0.3 : 1;
      }

      rightArrow.addEventListener("click", () => {
        index += cardsPerView();
        update();
      });

      leftArrow.addEventListener("click", () => {
        index -= cardsPerView();
        update();
      });

      // Swipe support for touch screens
      let touchStartX = 0;

      viewport.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX;
      }, { passive: true });

      viewport.addEventListener("touchend", (e) => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 50) {
          index += dx < 0 ? cardsPerView() : -cardsPerView();
          update();
        }
      });

      window.addEventListener("resize", update);

      update();
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

});
