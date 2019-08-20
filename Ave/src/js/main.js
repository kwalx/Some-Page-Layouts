const btnMenu = document.querySelector('.btn-menu');

btnMenu.addEventListener('click', () => {
  document.querySelector('.page-nav-inner').classList.toggle('close');
});
