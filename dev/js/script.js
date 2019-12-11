(function($) {
  $(function() {
    var $hamburger, $nav, slider;
    $hamburger = $('.hamburger');
    $nav = $('.nav');
    // скрыть/показать меню на маленьких экранах при клике
    $hamburger.on('click', function(event) {
      event.preventDefault();
      $(this).toggleClass('fa-menu').toggleClass('fa-close');
      $nav.toggleClass('is-show');
    });
    // плавный скролл на верх страницы
    $('a.scrollto').click(function() {
      var destination, elementClick;
      elementClick = "#" + $(this).attr("href").split("#")[1];
      destination = $(elementClick).offset().top;
      $('html:not(:animated),body:not(:animated)').animate({
        scrollTop: destination
      }, 800);
      return false;
    });
    // анимация при скролле
    // $.fn.animated = function(inEffect) {
    //   $(this).each(function() {
    //     var ths;
    //     ths = $(this);
    //     ths.css("opacity", "0").addClass("is-animated").waypoint(function(dir) {
    //       if (dir === "down") {
    //         ths.addClass(inEffect).css("opacity", "1");
    //       }
    //     }, {
    //       offset: "90%"
    //     });
    //   });
    // };
    $('.alert.is-danger').animated('a-shake');
    // Закрыть предупреждение
    $('.alert .fa-close').on('click', function(event) {
      $(this).closest('.alert').fadeOut('slow/400/fast', function() {
        $(this).remove();
      });
    });
    $("#l-top-scroll").mPageScroll2id();
    // Полифил для pointer-events: none в браузере IE9, IE10
    PointerEventsPolyfill.initialize({});
    // Слайдеры
    slider = $('.slider');
    // Слайдер баннеров
    $(slider).closest('.slider-banner').slick({
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 2000,
      autoplay: true,
      responsive: [
        {
          breakpoint: 480,
          settings: {
            arrows: true,
            dots: false
          }
        }
      ]
    });
    // Слайдер купили на этой недели
    $(slider).closest('.slider-img').slick({
      dots: true,
      slidesToShow: 4,
      slidesToScroll: 4,
      // arrows: false
      responsive: [
        {
          breakpoint: 1060,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 769,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  });
})(jQuery);
