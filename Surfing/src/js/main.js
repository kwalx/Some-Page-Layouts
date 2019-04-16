$(document).ready(function() {
  /* Header navigation */
  $('.nav-btn').on('click', function(e) {
    e.preventDefault();

    if ($('.nav-list').hasClass('active')) {
      $('.nav-list').removeClass('active');
    } else {
      $('.nav-list').addClass('active');
    }
  });

  /* Banner carousel */
  (function() {
    $('.owl-carousel.banner-owl-carousel').owlCarousel({
      items: 1,
      nav: true,
      navText: [
        '<span class="banner-nav"><img src="img/bg-arrow-prev.png" alt="prev"></span>',
        '<span class="banner-nav"><img src="img/bg-arrow-next.png" alt="next"></span>'
      ],
      autoHeight: true
    });
  })();

  /* Shop carousel */
  (function() {
    $('.owl-carousel.shop-owl-carousel').owlCarousel({
      nav: true,
      autoHeight: true,
      margin: 0,
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
