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
    const leftArrow = document.querySelector(".arrow.left");
    const rightArrow = document.querySelector(".arrow.right");

    if (track && leftArrow && rightArrow) {

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

        return Math.max(
          0,
          Math.ceil(trackWidth / viewportWidth) - 1
        );
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
