const navigation = document.querySelector('.header-navigation');
const navigationBtn = navigation.querySelector('.nav-btn');

navigationBtn.addEventListener('click', () => {
  const navigationList = navigation.querySelector('.nav-list');
  navigationList.classList.toggle('active');
});
