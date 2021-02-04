(() => {
  // Navigation menu

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

    if (expanded) {
      addRemoveClass(0, page, 'add', 'page--open');
      addRemoveClass(0, navigationMenu, 'add', 'show');
      addRemoveClass(150, navigationMenu, 'add', 'menu__list--open');
    } else {
      addRemoveClass(150, page, 'remove', 'page--open');
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

  const links = document.querySelectorAll('.menu__link');

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      if (page.classList.contains('page--open')) {
        showHidePanel();
      } else {
        return false;
      }
    });
  });
})();

// Banner slider

(() => {
  const config = {
    type: 'carousel',
    startAt: 0,
    perView: 1
  };

  const bannerSliderLength = (Glide, Components, Events) => {
    return {
      mount() {
        Events.emit('length', Components.Sizes.length);
        const bannerQantity = document.querySelector('.counter-quantity');
        bannerQantity.textContent = `${Components.Sizes.length}`;
      }
    };
  };

  const bannerSlier = new Glide('.glide', config);

  bannerSlier.mount({
    bannerSliderLength
  });

  const currentSlide = document.querySelector('.current-slide');
  currentSlide.textContent = `${bannerSlier.index + 1}`;

  bannerSlier.on('move', function(event) {
    currentSlide.textContent = `${bannerSlier.index + 1}`;
  });
})();
