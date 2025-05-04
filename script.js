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
    let centerY = dotCanvas.height *0.342;

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

        console.log("Starting animation...");

        scale = 1;

        dotCanvas.style.display = "block";
        dotCtx.clearRect(0, 0, dotCanvas.width, dotCanvas.height);

        function draw() {

            dotCtx.clearRect(0, 0, dotCanvas.width, dotCanvas.height);

            dotCtx.fillStyle = "white";
            dotCtx.fillRect(0, 0, dotCanvas.width, dotCanvas.height);

            dotCtx.fillStyle = "black";
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
        }, 10000);
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
        centerY = dotCanvas.height * 0.342;
    });
    //courses
    const carousel = document.querySelector('.courses-carousel');
    const leftArrow = document.querySelector('.arrow.left');
    const rightArrow = document.querySelector('.arrow.right');

    if (carousel && leftArrow && rightArrow) {
        const scrollAmount = carousel.offsetWidth * 2.3; // show 2 courses per view

        leftArrow.addEventListener('click', () => {
            carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        rightArrow.addEventListener('click', () => {
            carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }
    //projects section
    const imageItems = document.querySelectorAll('#image-carousel .carousel-item');
    const textItems = document.querySelectorAll('#text-carousel .carousel-item');
    const nextBtn = document.getElementById('next');
    const prevBtn = document.getElementById('prev');
    let currentIndex = 0;

    function updateCarousels(index) {
        imageItems.forEach((item, i) => {
        item.classList.toggle('active', i === index);
        });
        textItems.forEach((item, i) => {
        item.classList.toggle('active', i === index);
        });
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % imageItems.length;
        updateCarousels(currentIndex);
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + imageItems.length) % imageItems.length;
        updateCarousels(currentIndex);
    });
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

