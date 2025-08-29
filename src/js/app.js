window.addEventListener("load", function () {
  let header = document.querySelector("header");
  let link = document.querySelector(".header__burger");
  let menu = document.querySelector(".header__nav");

  if (menu) {
    link.addEventListener("click", function () {
      link.classList.toggle("active");
      menu.classList.toggle("open");
    });

    window.addEventListener("scroll", () => {
      if (menu.classList.contains("open")) {
        link.classList.remove("active");
        menu.classList.remove("open");
      }
    });

    document.addEventListener("click", (e) => {
      let target = e.target;
      if (
        !target.closest(".header__nav") &&
        !target.closest(".header__burger") &&
        !target.closest(".button-dropdown")
      ) {
        link.classList.remove("active");
        menu.classList.remove("open");
        closeAllDropdowns();
      }
    });

    const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

    // Десктоп: hover
    if (window.innerWidth > 1024) {
      dropdownToggles.forEach(toggle => {
        const parent = toggle.closest(".button-dropdown");

        parent.addEventListener("mouseenter", () => {
          closeAllDropdowns();
          parent.classList.add("open");
          const dropdown = parent.querySelector(".dropdown-menu");
          dropdown.style.maxHeight = dropdown.scrollHeight + "px";
        });

        parent.addEventListener("mouseleave", () => {
          parent.classList.remove("open");
          const dropdown = parent.querySelector(".dropdown-menu");
          dropdown.style.maxHeight = null;
        });
      });
    }

    // Мобильный: click
    else {
      dropdownToggles.forEach(toggle => {
        toggle.addEventListener("click", function (e) {
          e.preventDefault();
          const parent = toggle.closest(".button-dropdown");
          const dropdown = parent.querySelector(".dropdown-menu");
          const height = dropdown.scrollHeight;

          if (parent.classList.contains("open")) {
            parent.classList.remove("open");
            dropdown.style.maxHeight = null;
          } else {
            closeAllDropdowns();
            dropdown.style.maxHeight = height + "px";
            parent.classList.add("open");
          }
        });
      });
    }

    function closeAllDropdowns() {
      document.querySelectorAll(".button-dropdown").forEach(item => {
        item.classList.remove("open");
        const menu = item.querySelector(".dropdown-menu");
        if (menu) {
          menu.style.maxHeight = null;
        }
      });
    }
  }

  function checkScroll() {
    if (window.scrollY > 0) {
      header.classList.add("scroll");
    } else {
      header.classList.remove("scroll");
    }
  }

  function setSectionMargin() {
    const section = document.querySelector(".section-first");

    if (!header || !section) return;

    const headerHeight = header.offsetHeight;
    section.style.marginTop = headerHeight + "px";
  }

  checkScroll();
  setSectionMargin();

  // Swiper

  var heroSwiper = new Swiper(".heroSwiper", {
    spaceBetween: 16,
    pagination: {
      el: ".hero-pagination",
    },
  });

  const differencesSwiper = new Swiper(".differencesSwiper", {
    spaceBetween: 15,
    slidesPerView: 1,
    autoHeight: true,
    freeMode: true,
    watchSlidesProgress: true,
  });
  const differencesSwiper2 = new Swiper(".differencesSwiper2", {
    spaceBetween: 15,
    autoHeight: true,
    navigation: {
      nextEl: ".main-differences-next",
      prevEl: ".main-differences-prev",
    },
    pagination: {
      el: ".main-differences-pagination",
      type: "fraction",
      renderFraction: function (currentClass, totalClass) {
        return '<span class="' + currentClass + '"></span>' +
              '-' +
              '<span class="' + totalClass + '"></span>';
      },
      formatFractionCurrent: function (number) {
        return number < 10 ? '0' + number : number;
      },
      formatFractionTotal: function (number) {
        return number < 10 ? '0' + number : number;
      }
    },
    thumbs: {
      swiper: differencesSwiper,
    },
  });

  var historySwiper = new Swiper(".historySwiper", {
    spaceBetween: 12,
    slidesPerView: 1.4,
    grabCursor: true,
    autoplay: { 
      delay: 3500, 
      disableOnInteraction: false 
    },
    pagination: {
      el: ".main-history-pagination",
      type: "progressbar",
    },
    breakpoints: {
      768: {
        slidesPerView: 2.5,
      },
      1025: {
        slidesPerView: 4,
      },
    },
  });

  var eventsSwiper = new Swiper(".eventsSwiper", {
    slidesPerView: 1.1,
    spaceBetween: 12,
    breakpoints: {
      768: {
        slidesPerView: 1.5,
      },
    },
  });

  // manifesto Swiper

  const manifestoSwiper = new Swiper(".manifestoSwiper", {
    autoplay: { delay: 3000, disableOnInteraction: false },
    pagination: { el: ".main-manifesto-pagination", clickable: true },
    loop: false,
    on: {
      init(swiper) {
        setProgressDurations(swiper);
        startCycle(swiper, true);
      },
      slideChange(swiper) {
        const from = typeof swiper.previousRealIndex === "number"
          ? swiper.previousRealIndex
          : swiper.previousIndex ?? 0;

        const to = swiper.realIndex;

        const wrappedToStart = to === 0 && from !== 0;
        startCycle(swiper, wrappedToStart);
      }
    }
  });

  function setProgressDurations(swiper) {
    const delay = swiper.params.autoplay?.delay || 3000;
    swiper.pagination.bullets.forEach(b =>
      b.style.setProperty("--progress-duration", `${delay}ms`)
    );
  }

  function startCycle(swiper, forceReset = false) {
    const bullets = Array.from(swiper.pagination.bullets);
    const activeIdx = swiper.realIndex;

    if (forceReset) {
      bullets.forEach(b => b.classList.remove("is-animating", "is-complete"));
      bullets[0] && bullets[0].offsetWidth;
    }

    bullets.forEach((b, i) => {
      if (i < activeIdx) {
        b.classList.add("is-complete");
        b.classList.remove("is-animating");
      } else if (i > activeIdx) {
        b.classList.remove("is-complete", "is-animating");
      }
    });

    const current = bullets[activeIdx];
    if (current) {
      current.classList.remove("is-animating");
      current.offsetWidth;
      current.classList.add("is-animating");
    }
  }

  const sliderEl = document.querySelector(".manifestoSwiper");
  if (sliderEl) {
    sliderEl.addEventListener("mouseenter", () => manifestoSwiper.autoplay.stop());
    sliderEl.addEventListener("mouseleave", () => manifestoSwiper.autoplay.start());
  }


  // main-differences

  const boxes = document.querySelectorAll(".main-differences-desk .main-differences__box");
  const buttons = document.querySelectorAll(".main-differences-desk .main-differences__button");
  const images = document.querySelectorAll(".main-differences-desk .main-differences__img");

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.8, // срабатывает, когда 50% блока видно
  };

  const deactivateAll = () => {
    buttons.forEach(btn => btn.classList.remove("active"));
    images.forEach(img => img.classList.remove("active"));
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = Array.from(boxes).indexOf(entry.target);
        if (index !== -1) {
          deactivateAll();
          buttons[index].classList.add("active");
          images[index].classList.add("active");
        }
      }
    });
  }, options);

  boxes.forEach(box => observer.observe(box));

  gsap.registerPlugin(SplitText, ScrollTrigger);

  // modal

    const modalWrapper = document.querySelector('.modals');

  if(modalWrapper) {
    const modal = modalWrapper.querySelector('.modal');

    const openModal = () => {
      document.body.style.overflow = 'hidden';
      modalWrapper.style.opacity = 1;
      modalWrapper.style.pointerEvents = 'all';
      gsap.fromTo(modal, { x: '100%' }, { x: '0%', duration: 0.5, ease: 'power3.out' });
    };

    const closeModal = () => {
      gsap.to(modal, {
        x: '100%',
        duration: 0.4,
        ease: 'power3.in',
        onComplete: () => {
          document.body.style.overflow = '';
          modal.style.removeProperty('transform');
          modalWrapper.style.opacity = 0;
          modalWrapper.style.pointerEvents = 'none';
        }
      });
    };

    document.querySelectorAll('.vacancies__card').forEach(card => {
      card.addEventListener('click', () => {
        modal.querySelector('.modal__position').textContent = card.dataset.position || '';
        modal.querySelector('.modal__price').textContent = card.dataset.price || '';
        modal.querySelector('.modal__city').textContent = card.dataset.city || '';
        modal.querySelector('.modal__exper').textContent = card.dataset.exper || '';
        modal.querySelector('.modal__excerpt').textContent = card.dataset.excerpt || '';
        modal.querySelector('.modal__desc').innerHTML = card.dataset.desc || '';

        const respon = JSON.parse(card.dataset.respon || '[]');
        const list = modal.querySelector('.modal__respon');
        list.innerHTML = '';
        respon.forEach(item => {
          const li = document.createElement('li');
          li.textContent = item;
          list.appendChild(li);
        });

        const requir = JSON.parse(card.dataset.requir || '[]');
        const list2 = modal.querySelector('.modal__requir');
        list2.innerHTML = '';
        requir.forEach(item => {
          const li = document.createElement('li');
          li.textContent = item;
          list2.appendChild(li);
        });

        openModal();
      });
    });

    modalWrapper.addEventListener('click', e => {
      if (e.target === modalWrapper || e.target.classList.contains('modal__close')) {
        closeModal();
      }
    });
  }

  // Показать еще

  const showMore = document.querySelector('.post__button.show');
  const ShowPerClick = 4;

  if(showMore) {
    showMore.addEventListener('click', function () {
      const postCards = document.querySelectorAll('.post__cards .hidden');
      
      if (postCards.length === 0) {
        showMore.style.display = 'none';
        return;
      }

      Array.from(postCards)
        .slice(0, ShowPerClick)
        .forEach(card => card.classList.remove('hidden'));
        
      if (!document.querySelector('.post__cards .hidden')) {
        showMore.style.display = 'none';
      }
    });
  }

  // Phone
  
  [].forEach.call( document.querySelectorAll('input[type="tel"]'), function(input) {
    var keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        var matrix = "+7 (___) ___ ____",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function(a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
        i = new_value.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        var reg = matrix.substring(0, this.value.length).replace(/_+/g,
            function(a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5)  this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false);
  });

  window.addEventListener("scroll", ()=> {
    checkScroll();
  });

  window.addEventListener("resize", setSectionMargin);
});
