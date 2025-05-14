document.addEventListener("DOMContentLoaded", function () {
  const dotCanvas = document.getElementById("dot-canvas");
  const dotCtx = dotCanvas.getContext("2d");
  const aboutText = document.querySelector(".about-text");
  const header = document.querySelector(".header");
  const dropdown = document.querySelector(".dropdown"); // if you have one

  // Set canvas size
  dotCanvas.width = window.innerWidth;
  dotCanvas.height = window.innerHeight;

  let scale = 1;
  const minScale = 0.001;
  let centerX = dotCanvas.width *0.637;
  let centerY = dotCanvas.height *0.34;

  let inactivityTimer;
  let animationStarted = false;
  let lockScroll = true;
  let animationTriggered = false;
  

  function showAllText() {
      aboutText.classList.add("show");
      header.classList.add("inverted");
      if (dropdown) {
          dropdown.classList.add("inverted");
      }
  
      const elementsToShow = [
          document.querySelector('.center-text'),
          document.querySelector('.left-text'),
          document.querySelector('.about-image'),
          document.querySelector('.bottom-left-text'),
          document.querySelector('.courses-label'),
      ];
  
      elementsToShow.forEach((element, index) => {
          if (element) {
              setTimeout(() => {
                  element.classList.add('show');
              }, index * 2000); // 400ms between each fade-in
          }
      });
  }
  
  function startAnimation() {
      if (animationStarted) return;
      animationStarted = true;
      animationTriggered = true;


      scale = 1;

      dotCanvas.style.display = "block";
      dotCtx.clearRect(0, 0, dotCanvas.width, dotCanvas.height);

      function draw() {

          dotCtx.clearRect(0, 0, dotCanvas.width, dotCanvas.height);

          dotCtx.fillStyle = "white";
          dotCtx.fillRect(0, 0, dotCanvas.width, dotCanvas.height);

          if (scale > minScale) {
            dotCtx.fillStyle = "black";
          } else {
            dotCtx.fillStyle = "white"; // match background
          }
          dotCtx.beginPath();
          const maxDist = Math.sqrt(dotCanvas.width ** 2 + dotCanvas.height ** 2);
          dotCtx.arc(centerX, centerY, scale * maxDist, 0, Math.PI * 2);
          dotCtx.fill();

          if (scale > minScale) {
              scale *= 0.95;
              requestAnimationFrame(draw);
          }else {
              showAllText();
              animationStarted = false;
              unlockScrolling();
          }
      }

      draw();
  }

  function resetTimer() {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
          if (!aboutText.classList.contains("show")) {
              startAnimation();
          }
      }, 9000);
  }

  function unlockScrolling() {
      lockScroll = false;
  }
  
  window.addEventListener("scroll", () => {
      if (lockScroll) {
          window.scrollTo(0, 0);
      }
  });

  ["wheel", "touchstart"].forEach(event =>
      window.addEventListener(event, (e) => {
          if (!animationTriggered && lockScroll) {
              e.preventDefault();
              startAnimation();
          }
      }, { passive: false })
  );

  ["mousemove", "keydown", "wheel", "touchstart"].forEach(event =>
      window.addEventListener(event, resetTimer)
  );

  resetTimer();

  window.addEventListener("resize", () => {
      dotCanvas.width = window.innerWidth;
      dotCanvas.height = window.innerHeight;
      centerX = dotCanvas.width * 0.637;
      centerY = dotCanvas.height * 0.34;
  }); 

    const viewport   = document.querySelector('.courses-carousel');
    const track      = viewport.querySelector('.carousel-track');
    const leftArrow  = document.querySelector('.arrow.left');
    const rightArrow = document.querySelector('.arrow.right');
    const cards      = Array.from(track.children);
  
    if (!viewport || !track || !leftArrow || !rightArrow || cards.length === 0) {
      return;
    }
  
    const coursesPerPage = 2;
    let pageIndex = 0;
  
    // We'll recompute widths inside update() to adapt on resize
    function update() {
      const viewportWidth = viewport.getBoundingClientRect().width;
      const trackWidth    = track.scrollWidth;
  
      // Maximum shift so that the last cards sit flush on the right
      const maxOffset = trackWidth - viewportWidth;
  
      // Desired offset for this page
      let offset = pageIndex * viewportWidth;
      if (offset > maxOffset) offset = maxOffset;
  
      track.style.transform = `translateX(-${offset}px)`;
  
      // Disable arrows at the ends
      leftArrow.disabled  = (pageIndex === 0);
      rightArrow.disabled = (offset >= maxOffset);
    }
  
    // Compute how many pages there really are (including a possible partial last page)
    function computeMaxPage() {
      const viewportWidth = viewport.getBoundingClientRect().width;
      const trackWidth    = track.scrollWidth;
      return Math.ceil(trackWidth / viewportWidth) - 1;
    }
  
    rightArrow.addEventListener('click', () => {
      const maxPage = computeMaxPage();
      if (pageIndex < maxPage) {
        pageIndex++;
        update();
      }
    });
  
    leftArrow.addEventListener('click', () => {
      if (pageIndex > 0) {
        pageIndex--;
        update();
      }
    });
  
    // Recalculate on resize so that pageWidth and maxOffset stay correct
    window.addEventListener('resize', () => {
      // Clamp pageIndex if viewport got wider
      const maxPage = computeMaxPage();
      if (pageIndex > maxPage) pageIndex = maxPage;
      update();
    });
  
    // Initial draw
    update();

  // Kick things off
    const tabs = document.querySelectorAll(".tab");
    const contents = document.querySelectorAll(".project-content");
   
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
          // 1) deactivate all tabs & contents
          tabs.forEach(t => t.classList.remove("active"));
          contents.forEach(c => c.classList.remove("active"));
      
          // 2) activate the clicked tab + its content
          tab.classList.add("active");
          const target = tab.getAttribute("data-target");
          document.getElementById(target).classList.add("active");
        });
      });
      
      // On page load, activate the first pair
      if (tabs.length && contents.length) {
        tabs[0].classList.add("active");
        contents[0].classList.add("active");
      }
  
    //interests section
    document.querySelectorAll(".video-box video").forEach(video => {
        video.addEventListener("mouseenter", () => {
          video.play();
        });
        video.addEventListener("mouseleave", () => {
          video.pause();
          video.currentTime = 0; // optional: reset to beginning when hover ends
        });
    });
});

