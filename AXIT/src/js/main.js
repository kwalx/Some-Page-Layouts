$(document).ready(function() {
  /* Navigation */
  (function() {
    $('.nav-btn').on('click', function() {
      $('.nav-list').toggleClass('active');
    });

    $('#main-menu').on('click', 'a', function(e) {
      e.preventDefault();

      $('.nav-list').removeClass('active');

      let id = $(this).attr('href');
      let top;

      top = $(id).offset().top - $('.header-navbar').height();

      $('body,html').animate({ scrollTop: top }, 1000);
    });
  })();

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

      let href = $(this).attr('href');

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
