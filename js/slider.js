
  const track = document.getElementById("track");
  const originalSlides = Array.from(track.children);

  const slideWidth = 291;
  const gap = 25;
  const totalSlideWidth = slideWidth + gap;

  // ---- CLONE FOR INFINITE LOOP ----
  originalSlides.forEach(slide => {
    track.appendChild(slide.cloneNode(true));
    track.insertBefore(slide.cloneNode(true), track.firstChild);
  });

  let slides = Array.from(track.children);
  let index = originalSlides.length;

  let containerWidth = 1240;
  let slidesPerView = 3;
  let centerOffset = 0;

  function calculateLayout() {
    const w = window.innerWidth;

    if (w < 640) {
      slidesPerView = 1;
      containerWidth = slideWidth;
    } else if (w < 1024) {
      slidesPerView = 2;
      containerWidth = slideWidth * 2 + gap;
    } else {
      slidesPerView = 3;
      containerWidth = 1240;
    }

    centerOffset = containerWidth / 2 - slideWidth / 2;

    updatePosition(false);
  }

  function updatePosition(animated = true) {
    track.style.transition = animated ? "transform 0.5s ease" : "none";
    track.style.transform = `translateX(${
      centerOffset - index * totalSlideWidth
    }px)`;
  }

  function next() {
    index++;
    updatePosition();
    resetIfNeeded();
  }

  function prev() {
    index--;
    updatePosition();
    resetIfNeeded();
  }

  function resetIfNeeded() {
    setTimeout(() => {
      if (index >= slides.length - originalSlides.length) {
        index = originalSlides.length;
        updatePosition(false);
      }

      if (index < originalSlides.length) {
        index = slides.length - originalSlides.length * 2;
        updatePosition(false);
      }
    }, 500);
  }

  // NAV
  document.getElementById("next")?.addEventListener("click", next);
  document.getElementById("prev")?.addEventListener("click", prev);

  // AUTOPLAY
  setInterval(next, 3500);

  // INIT
  calculateLayout();
  window.addEventListener("resize", calculateLayout);

