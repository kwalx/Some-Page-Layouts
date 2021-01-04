// Language menu

(() => {
  const languageButton = document.querySelector('.lang__button');
  const languageMenu = document.querySelector('.lang__list');

  languageButton.addEventListener('click', () => {
    let expanded = languageMenu.getAttribute('aria-expanded') == 'false';
    languageMenu.setAttribute('aria-expanded', expanded);
    languageMenu.classList.toggle('lang__list--open');

    languageButton.classList.toggle('lang__button--open');
  });
})();

// Navigation menu

(() => {
  const page = document.querySelector('.page');
  const navigationButton = document.querySelector('.menu-button');
  const navigationMenu = document.querySelector('.menu__list');
  const overlay = document.querySelector('.overlay');

  const addRemoveClass = (time, element, action, className) => {
    if (action == 'add') {
      setTimeout(() => {
        element.classList.add(className);
      }, time);
    } else {
      setTimeout(() => {
        element.classList.remove(className);
      }, time);
    }
  };

  const showHidePanel = () => {
    let expanded = navigationMenu.getAttribute('aria-expanded') == 'false';
    navigationMenu.setAttribute('aria-expanded', expanded);

    page.classList.toggle('page--open');

    if (expanded) {
      addRemoveClass(0, navigationMenu, 'add', 'show');
      addRemoveClass(150, navigationMenu, 'add', 'menu__list--open');
    } else {
      addRemoveClass(150, navigationMenu, 'remove', 'menu__list--open');
      addRemoveClass(250, navigationMenu, 'remove', 'show');
    }
  };

  navigationButton.addEventListener('click', () => {
    showHidePanel();
  });

  overlay.addEventListener('click', () => {
    showHidePanel();
  });
})();

// Anchor scroll

(() => {
  const anchors = document.querySelectorAll('.nav-link');
  const scrollSpeed = 0.3;

  anchors.forEach((item) => {
    item.addEventListener('click', function(e) {
      e.preventDefault();

      const w = window.pageYOffset;
      const hash = this.href.replace(/[^#]*(.*)/, '$1');
      const indent = document.querySelector(hash).getBoundingClientRect().top;
      let start = null;

      requestAnimationFrame(step);

      function step(time) {
        if (start === null) start = time;

        const progress = time - start;
        const r =
          indent < 0
            ? Math.max(w - progress / scrollSpeed, w + indent)
            : Math.min(w + progress / scrollSpeed, w + indent);

        window.scrollTo(0, r);

        if (r != w + indent) {
          requestAnimationFrame(step);
        } else {
          location.hash = hash;
        }
      }
    });
  });
})();

// Swiper slider

(() => {
  var swiper = new Swiper('.swiper-container', {
    effect: 'coverflow',
    grabCursor: true,
    loop: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 100,
      stretch: 0,
      depth: 500,
      modifier: 1,
      slideShadows: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    pagination: {
      el: '.swiper-pagination'
    }
  });
})();

// Features accordeon

(() => {
  const links = document.querySelectorAll('.accordeon__link');

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const question = e.target.closest('.accordeon__item');

      if (!question.classList.contains('accordeon__item--open')) {
        question.classList.add('accordeon__item--open');
        question.querySelector('.accordeon__text').style.maxHeight =
          question.querySelector('.accordeon__text').scrollHeight + 'px';
      } else {
        question.classList.remove('accordeon__item--open');
        question.querySelector('.accordeon__text').style.maxHeight = null;
      }
    });
  });
})();
