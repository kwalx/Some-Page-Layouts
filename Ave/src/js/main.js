(function() {
  /**
   * Sticky header
   */
  const navigationContainer = document.querySelector('.section-nav');
  const banner = document.querySelector('.banner');
  const navigationContainerHeight = navigationContainer.getBoundingClientRect()
    .height;

  let lastScrollTop = 0;
  window.addEventListener('scroll', pageOnScroll, false);

  function pageOnScroll(e) {
    let top = window.pageYOffset;

    if (
      lastScrollTop > top &&
      navigationContainer.getBoundingClientRect().top <= 0
    ) {
      banner.classList.add('desktop-sticky');
      navigationContainer.style.top = '-110%';
      banner.style.paddingTop = `${navigationContainerHeight}px`;
    } else if (
      lastScrollTop < top ||
      navigationContainer.getBoundingClientRect().top > 0
    ) {
      banner.classList.add('desktop-sticky');
      navigationContainer.style.top = '0';
      banner.style.paddingTop = `${navigationContainerHeight}px`;
    }

    if (banner.getBoundingClientRect().top >= 0) {
      banner.classList.remove('desktop-sticky');
      banner.style.paddingTop = '';
    }

    lastScrollTop = top;
  }

  /**
   * Navigation
   */
  const navContainer = document.querySelector('.page-navigation');
  const btnMenu = document.querySelector('.btn-menu');

  btnMenu.addEventListener('click', () => {
    navContainer.classList.toggle('overlay');
    document.querySelector('.page-nav-inner').classList.toggle('close');
  });

  /**
   * Home page tabs
   */
  const tabLinksItem = document.querySelectorAll('.tabs-navigation__link');
  const tabContentItem = document.querySelectorAll('.tabs-content');

  tabLinksItem.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      for (let i = 0; i < tabLinksItem.length; i++) {
        tabLinksItem[i].classList.remove('tabs-navigation__link--active');
      }

      if (!link.classList.contains('tabs-navigation__link--active')) {
        link.classList.add('tabs-navigation__link--active');
      }

      for (let i = 0; i < tabContentItem.length; i++) {
        tabContentItem[i].classList.remove('tabs-content--active');

        if (link.getAttribute('href') == tabContentItem[i].getAttribute('id')) {
          tabContentItem[i].classList.add('tabs-content--active');
        }
      }
    });
  });
})();
