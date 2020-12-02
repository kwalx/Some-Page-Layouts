// Language menu

(() => {
  const languageButton = document.querySelector('.lang__button');
  const languageMenu = document.querySelector('#language-menu');

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
