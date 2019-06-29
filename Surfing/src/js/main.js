$(document).ready(function() {
  /* Header navigation */
  (function() {
    $('.nav-btn').on('click', function(e) {
      e.preventDefault();

      if ($('.nav-list').hasClass('active')) {
        $('.nav-list').removeClass('active');
        $('body').removeClass('overflow-hid');
      } else {
        $('.nav-list').addClass('active');
        $('body').addClass('overflow-hid');
      }
    });

    $('.anchor-link-navigation').on('click', 'a', function(e) {
      e.preventDefault();

      $('.nav-list').removeClass('active');
      $('body').removeClass('overflow-hid');

      let id = $(this).attr('href');
      let top;

      top = $(id).offset().top - $('.header').height();

      $('body,html').animate({ scrollTop: top }, 700);
    });

    $('.scroll-top').on('click', 'a', function(e) {
      e.preventDefault();

      $('body,html').animate({ scrollTop: 0 }, 700);
    });

    $(window).on('scroll', function() {
      let scrollPos = $(window).scrollTop();

      if (scrollPos > $('.header').height()) {
        $('.header').addClass('header-shadow');
      } else {
        $('.header').removeClass('header-shadow');
      }
    });

    $(window).on('scroll', function() {
      const $sections = $('section');

      $sections.each(function(i, el) {
        const top = $(el).offset().top - 100;
        const bottom = top + $(el).height();
        const scroll = $(window).scrollTop();
        const id = $(el).attr('id');

        if (scroll > top && scroll < bottom) {
          $('a.active').removeClass('active');
          $('a[href="#' + id + '"]').addClass('active');
        }
      });
    });
  })();

  /* Banner carousel */
  (function() {
    let owl = $('.owl-carousel.banner-owl-carousel');

    owl.owlCarousel({
      items: 1,
      nav: true,
      margin: 10,
      navText: [
        '<span class="banner-nav"><img src="img/bg-arrow-prev.png" alt="prev"></span><span class="banner-slide-counter"></span>',
        '<span class="banner-nav"><img src="img/bg-arrow-next.png" alt="next"></span>'
      ],
      autoHeight: true,
      onInitialized: function(e) {
        $('.banner-slide-counter').html(
          '<span class="slide-counter-mark">1</span> / ' + this.items().length
        );
      }
    });

    owl.on('changed.owl.carousel', function(e) {
      $('.banner-slide-counter').html(
        '<span class="slide-counter-mark">' +
          ++e.page.index +
          '</span>' +
          ' / ' +
          e.item.count
      );
    });
  })();

  /* Shop carousel */
  (function() {
    $('.owl-carousel.shop-owl-carousel').owlCarousel({
      items: 3,
      nav: true,
      navContainerClass: 'shop-navigation',
      navText: [
        '<span class="nav-shop-left nav-shop">&#10094;</span>',
        '<span class="nav-shop-right nav-shop">&#10095;</span>'
      ],
      autoHeight: true,
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

  /* Video (Info section) */
  (function() {
    function findVideos() {
      let videos = document.querySelectorAll('.info-media-video');

      for (let i = 0; i < videos.length; i++) {
        setupVideo(videos[i]);
      }
    }

    function setupVideo(video) {
      let link = video.querySelector('.info-media-video-link');
      let media = video.querySelector('.video-media');
      let button = video.querySelector('.video-btn');
      let id = parseMediaURL(media);

      video.addEventListener('click', () => {
        let iframe = createIframe(id);

        link.remove();
        button.remove();
        video.appendChild(iframe);
      });

      link.removeAttribute('href');
      video.classList.add('video-enabled');
    }

    function parseMediaURL(media) {
      let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
      let url = media.src;
      let match = url.match(regexp);

      return match[1];
    }

    function createIframe(id) {
      let iframe = document.createElement('iframe');

      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('allow', 'autoplay');
      iframe.setAttribute('src', generateURL(id));
      iframe.classList.add('video-media');

      return iframe;
    }

    function generateURL(id) {
      let query = '?rel=0&showinfo=0&autoplay=1';

      return 'https://www.youtube.com/embed/' + id + query;
    }

    findVideos();
  })();
});
