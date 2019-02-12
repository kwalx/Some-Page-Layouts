$(document).ready(function() {
  /* Navigation */
  const navigation = document.querySelector('.header-navigation');
  const navigationBtn = navigation.querySelector('.nav-btn');

  navigationBtn.addEventListener('click', () => {
    const navigationList = navigation.querySelector('.nav-list');
    navigationList.classList.toggle('active');
  });

  /* Features section Tabs */
  (function() {
    $('.tab')
      .not('.active')
      .hide();

    $('.tab-label-link').on('click', function(e) {
      e.preventDefault();

      $('.tab-label-link')
        .parent()
        .removeClass('active');

      $(this)
        .parent()
        .addClass('active');

      var href = $(this).attr('href');

      $('.tab').each(function() {
        if ($(this).attr('id') == href) {
          $('.tab')
            .removeClass('active')
            .hide();
          $(this)
            .addClass('active')
            .fadeIn(500);
        }
      });
    });
  })();

  /* Reviews section carousel */
  (function() {
    $('.owl-carousel').owlCarousel({
      margin: 15,
      responsive: {
        320: {
          items: 1
        },
        680: {
          items: 2
        },
        980: {
          items: 3
        }
      }
    });
  })();
});
