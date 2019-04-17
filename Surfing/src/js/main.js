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
