document.addEventListener("DOMContentLoaded", function () {
  const dotCanvas = document.getElementById("dot-canvas");
  const dotCtx = dotCanvas.getContext("2d");
  const aboutText = document.querySelector(".about-text");
  const header = document.querySelector(".header");
  const dropdown = document.querySelector(".dropdown"); // if you have one

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
  
//showing text gradually on about page 
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
              }, index * 2000); // 0.4 s between each fade-in
          }
      });
  }
//dot animation  
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

//courses section, code for making sure carousel only shows 2 course per scroll
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

    function update() {
      const viewportWidth = viewport.getBoundingClientRect().width;
      const trackWidth    = track.scrollWidth;
  
      const maxOffset = trackWidth - viewportWidth;
  
      let offset = pageIndex * viewportWidth;
      if (offset > maxOffset) offset = maxOffset;
  
      track.style.transform = `translateX(-${offset}px)`;
  
    }
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

    window.addEventListener('resize', () => {
      const maxPage = computeMaxPage();
      if (pageIndex > maxPage) pageIndex = maxPage;
      update();
    });
  
    update();

//projects section
    const tabs = document.querySelectorAll(".tab");
    const contents = document.querySelectorAll(".project-content");
   
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {

          tabs.forEach(t => t.classList.remove("active"));
          contents.forEach(c => c.classList.remove("active"));

          tab.classList.add("active");
          const target = tab.getAttribute("data-target");
          document.getElementById(target).classList.add("active");
        });
      });
      
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
          video.currentTime = 0; 
        });
    });
});

