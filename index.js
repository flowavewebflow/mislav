// Fire scripts
initScripts();

/*function initCalculator() {
  const output = document.querySelectorAll("[data-quote]");
  const hiddenInput = document.querySelector("[data-final-price]");
  const inputs = document.querySelectorAll("[data-price]");
  const plusRadio = document.querySelector("#tenPlus");
  const plusField = document.querySelector("[data-plus]");

  if (output.length && hiddenInput) {
    function updatePrice() {
      let total = 0;
      inputs.forEach((input) => {
        if (
          (input.type === "radio" || input.type === "checkbox") &&
          input.checked
        ) {
          total += parseFloat(input.getAttribute("data-price")) || 0;
        }
      });

      // Update all quote outputs
      output.forEach((el) => {
        el.textContent = total.toLocaleString();
      });

      hiddenInput.value = total;
      plusField.style.display = plusRadio.checked ? "inline-block" : "none";
    }

    inputs.forEach((input) => input.addEventListener("change", updatePrice));
    updatePrice();
  }
}*/

function initTime() {
  // Updates text span to current year
  const currentYear = new Date().getFullYear();
  const year = document.querySelector("[data-year]");
  year.textContent = currentYear;

  // Updates text span to current time
  const currentTime = new Date().toLocaleTimeString("en-US", {
    timeZone: "Europe/Zagreb",
    hour: "numeric",
    minute: "numeric",
    // second: 'numeric',
    hour12: true,
  });
  const time = document.querySelector("[data-time]");

  time.textContent = currentTime;
}

function initNav() {
  const button = document.querySelector(".nav_button");
  const menu = document.querySelector(".nav_menu--mobile");
  const links = menu.querySelectorAll("a");

  button.addEventListener("click", () => {
    menu.classList.toggle("is--open");
    button.classList.toggle("is--open");
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      if (menu.classList.contains("is--open")) {
        menu.classList.remove("is--open");
        button.classList.remove("is--open");
      }
    });
  });
}

function initTippy() {
  if (document.querySelector("[data-tippy-content]")) {
    tippy("[data-tippy-content]", {
      arrow: true,
      theme: "light",
    });
  }
}

function initNavScroll() {
  const navElement = document.querySelector("[data-nav]");

  if (navElement) {
    const handleScroll = () => {
      navElement.classList.toggle("is--scrolled", window.pageYOffset > 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
  }
}

function initCloseBanner() {
  const close = document.querySelector(".banner_close");
  const banner = document.querySelector(".banner");

  close.addEventListener("click", () => {
    banner.style.display = "none";
  });
}

function initCheckbox() {
  if (document.querySelector('[data-form="submit"]')) {
    // Check if checkbox is checked
    document
      .querySelector('[data-form="submit"]')
      .addEventListener("click", function (event) {
        let isChecked = false;
        const checkboxContainer = document.querySelector(
          '[data-form="checkbox"]'
        );
        const checkboxes = checkboxContainer.querySelectorAll("input");

        checkboxes.forEach(function (checkbox) {
          if (checkbox.checked) {
            isChecked = true;
          }
        });

        if (!isChecked) {
          document.querySelector('[data-form="error"]').style.display = "block";
          event.preventDefault(); // Prevent form submission
        }
      });

    // Hide error message if checkbox is checked
    document
      .querySelectorAll('[data-form="checkbox"] input')
      .forEach(function (input) {
        input.addEventListener("click", function () {
          const errorMessage = document.querySelector('[data-form="error"]');
          if (errorMessage.style.display !== "none" && this.checked) {
            errorMessage.style.display = "none";
          }
        });
      });
  }
}

function initSwiper() {
  if (document.querySelector('[data-swiper="work"]')) {
    const workSwiper = new Swiper('[data-swiper="work"]', {
      slidesPerView: "auto",
      a11y: {
        slideRole: "listitem",
      },
      loop: true,
      navigation: {
        nextEl: '[data-swiper="work-right"]',
        prevEl: '[data-swiper="work-left"]',
      },
      breakpoints: {
        320: {
          spaceBetween: 8,
        },
        468: {
          spaceBetween: 16,
        },
      },
    });
  }

  if (document.querySelector('[data-swiper="review"]')) {
    const workSwiper = new Swiper('[data-swiper="review"]', {
      slidesPerView: "auto",
      loop: true,
      a11y: {
        slideRole: "listitem",
      },
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      navigation: {
        nextEl: '[data-swiper="review-next"]',
        prevEl: '[data-swiper="review-prev"]',
      },
      breakpoints: {
        320: {
          spaceBetween: 8,
        },
        468: {
          spaceBetween: 16,
        },
        992: {
          spaceBetween: 32,
        },
      },
    });
  }
}

function initStack() {
  const cards = document.querySelectorAll('[data-service="card"]');
  if (cards.length === 0) return;
  let isTicking = false;

  const updateCardStyles = () => {
    cards.forEach((card, index) => {
      const nextCard = cards[index + 1];
      if (!nextCard) return;

      const cardRect = card.getBoundingClientRect();
      const nextCardRect = nextCard.getBoundingClientRect();
      const overlap = Math.max(0, cardRect.bottom - nextCardRect.top);
      const progress = overlap / cardRect.height;

      const baseRotation = index % 2 === 0 ? 4 : -4;
      const rotation = baseRotation * progress;

      card.style.transform = `scale(${
        1 - 0.1 * progress
      }) rotateZ(${rotation}deg)`;
    });

    isTicking = false;
  };

  window.addEventListener("scroll", () => {
    if (!isTicking) {
      requestAnimationFrame(updateCardStyles);
      isTicking = true;
    }
  });
}



function initScripts() {
  initSwiper();
  initNav();
  initNavScroll();
  initStack();
  initCloseBanner();
  initTime();
  initTippy();
  initCheckbox();
}
