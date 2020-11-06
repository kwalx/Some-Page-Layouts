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
  const faq_items = document.querySelectorAll('.faq__item');

  faq_items.forEach((item) => {
    item.addEventListener('click', function() {
      this.classList.toggle('faq__item--open');
      if (this.querySelector('.faq__text').style.maxHeight) {
        this.querySelector('.faq__text').style.maxHeight = null;
      } else {
        this.querySelector('.faq__text').style.maxHeight =
          this.querySelector('.faq__text').scrollHeight + 'px';
      }
    });
  });
})();
