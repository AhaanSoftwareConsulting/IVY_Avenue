const swiper = new Swiper(".testimonialSwiper", {
    slidesPerView: "3",
    spaceBetween: 25,
    loop: true,
    centeredSlides: true,
    speed: 800,

    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },

    navigation: {
      nextEl: ".swiper-next",
      prevEl: ".swiper-prev",
    },

    breakpoints: {
      0: {
         slidesPerView: 1,
        centeredSlides: true,
      },
      768: {
         slidesPerView: 2,
        centeredSlides: true,
      },

    1024: {
         slidesPerView: 3,
        centeredSlides: true,
      },
    },
  });
