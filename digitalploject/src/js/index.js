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

  let pageSlider;

  if (document.querySelector('.glide')) {
    const sliderLength = (Glide, Components, Events) => {
      return {
        mount() {
          Events.emit('length', Components.Sizes.length);
          const bannerQantity = document.querySelector('.counter-quantity');
          bannerQantity.textContent = `${Components.Sizes.length}`;
        }
      };
    };

    pageSlider = new Glide('.glide', config);

    pageSlider.mount({
      sliderLength
    });

    pageSlider.on('build.after', function() {
      glideHandleHeight();
    });

    pageSlider.on('run.after', function() {
      glideHandleHeight();
    });

    const currentSlide = document.querySelector('.current-slide');
    currentSlide.textContent = `${pageSlider.index + 1}`;

    pageSlider.on('move', function(event) {
      currentSlide.textContent = `${pageSlider.index + 1}`;
    });

    function glideHandleHeight() {
      const activeSlide = document.querySelector('.glide__slide--active');
      const activeSlideHeight = activeSlide ? activeSlide.offsetHeight : 0;

      const glideTrack = document.querySelector('.glide__track');
      const glideTrackHeight = glideTrack ? glideTrack.offsetHeight : 0;

      if (activeSlideHeight !== glideTrackHeight) {
        glideTrack.style.height = `${activeSlideHeight}px`;
      }
    }
  } else {
    pageSlider = false;
  }
})();

// Contact form

(() => {
  const inputList = document.querySelectorAll('.input-box__field');
  const msg = document.querySelector('.input-box__message');

  function inputIsEmpty(item) {
    if (this.classList.contains('no-empty')) {
      this.classList.remove('no-empty');
    }

    if (item.target.value.length > 0) {
      this.classList.add('no-empty');
    }
  }

  inputList.forEach((item) => {
    item.addEventListener('input', inputIsEmpty);
  });
})();
