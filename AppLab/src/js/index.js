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
