// Hide header on scroll

(() => {
  const page = document.querySelector('.page');
  const pageHeader = document.querySelector('.header');
  let pageHeaderHeight = pageHeader.offsetHeight;
  let scrollPos = window.pageYOffset;

  page.style.paddingTop = `${pageHeaderHeight}px`;

  window.onscroll = function() {
    let currentScrollPos = window.pageYOffset;

    if (scrollPos > currentScrollPos) {
      pageHeader.style.top = '0';
    } else {
      pageHeader.style.top = `-${pageHeaderHeight * 1.5}px`;
    }

    scrollPos = currentScrollPos;
  };
})();

// Menu

(() => {
  const page = document.querySelector('.page');
  const menu = document.querySelector('.menu');
  const menuButton = document.querySelector('.menu__button');
  const menuList = document.querySelector('.menu__list');

  menuButton.addEventListener('click', () => {
    let expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', !expanded);

    page.classList.toggle('page--open');
    menu.classList.toggle('menu--open');

    menuButton.classList.toggle('menu__button--open');
    menuList.classList.toggle('menu__list--open');
  });
})();

// Scroll navigation

(() => {
  const page = document.querySelector('.page');
  const menu = document.querySelector('.menu');
  const menuButton = document.querySelector('.menu__button');
  const menuList = document.querySelector('.menu__list');

  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      let href = this.getAttribute('href').substr(1);
      const scrollTarget = document.getElementById(href);
      const topOffset = document.querySelector('.header').offsetHeight;
      const elementPosition = scrollTarget.getBoundingClientRect().top;
      const offsetPosition = elementPosition - topOffset;

      window.scrollBy({
        top: offsetPosition,
        behavior: 'smooth'
      });

      page.classList.remove('page--open');
      menu.classList.remove('menu--open');

      menuButton.classList.remove('menu__button--open');
      menuList.classList.remove('menu__list--open');
    });
  });
})();

// Glide slider

(() => {
  const config = {
    type: 'carousel',
    startAt: 0,
    perView: 1
  };

  new Glide('.glide', config).mount();
})();

// FAQ

(() => {
  const questionBtns = document.querySelectorAll('.question__js');

  questionBtns.forEach((questionBtn) => {
    questionBtn.addEventListener('click', (el) => {
      el.preventDefault();

      const question = el.target.closest('.faq__item');

      if (!question.classList.contains('faq__item--open')) {
        question.classList.add('faq__item--open');
        question.querySelector('.faq__text').style.maxHeight =
          question.querySelector('.faq__text').scrollHeight + 'px';
      } else {
        question.classList.remove('faq__item--open');
        question.querySelector('.faq__text').style.maxHeight = null;
      }
    });
  });
})();
