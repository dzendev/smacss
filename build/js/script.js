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
    // $('.alert.is-danger').animated('a-shake');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCQpIHtcclxuICAkKGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyICRoYW1idXJnZXIsICRuYXYsIHNsaWRlcjtcclxuICAgICRoYW1idXJnZXIgPSAkKCcuaGFtYnVyZ2VyJyk7XHJcbiAgICAkbmF2ID0gJCgnLm5hdicpO1xyXG4gICAgLy8g0YHQutGA0YvRgtGML9C/0L7QutCw0LfQsNGC0Ywg0LzQtdC90Y4g0L3QsCDQvNCw0LvQtdC90YzQutC40YUg0Y3QutGA0LDQvdCw0YUg0L/RgNC4INC60LvQuNC60LVcclxuICAgICRoYW1idXJnZXIub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnZmEtbWVudScpLnRvZ2dsZUNsYXNzKCdmYS1jbG9zZScpO1xyXG4gICAgICAkbmF2LnRvZ2dsZUNsYXNzKCdpcy1zaG93Jyk7XHJcbiAgICB9KTtcclxuICAgIC8vINC/0LvQsNCy0L3Ri9C5INGB0LrRgNC+0LvQuyDQvdCwINCy0LXRgNGFINGB0YLRgNCw0L3QuNGG0YtcclxuICAgICQoJ2Euc2Nyb2xsdG8nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIGRlc3RpbmF0aW9uLCBlbGVtZW50Q2xpY2s7XHJcbiAgICAgIGVsZW1lbnRDbGljayA9IFwiI1wiICsgJCh0aGlzKS5hdHRyKFwiaHJlZlwiKS5zcGxpdChcIiNcIilbMV07XHJcbiAgICAgIGRlc3RpbmF0aW9uID0gJChlbGVtZW50Q2xpY2spLm9mZnNldCgpLnRvcDtcclxuICAgICAgJCgnaHRtbDpub3QoOmFuaW1hdGVkKSxib2R5Om5vdCg6YW5pbWF0ZWQpJykuYW5pbWF0ZSh7XHJcbiAgICAgICAgc2Nyb2xsVG9wOiBkZXN0aW5hdGlvblxyXG4gICAgICB9LCA4MDApO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuICAgIC8vINCw0L3QuNC80LDRhtC40Y8g0L/RgNC4INGB0LrRgNC+0LvQu9C1XHJcbiAgICAvLyAkLmZuLmFuaW1hdGVkID0gZnVuY3Rpb24oaW5FZmZlY3QpIHtcclxuICAgIC8vICAgJCh0aGlzKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gICAgIHZhciB0aHM7XHJcbiAgICAvLyAgICAgdGhzID0gJCh0aGlzKTtcclxuICAgIC8vICAgICB0aHMuY3NzKFwib3BhY2l0eVwiLCBcIjBcIikuYWRkQ2xhc3MoXCJpcy1hbmltYXRlZFwiKS53YXlwb2ludChmdW5jdGlvbihkaXIpIHtcclxuICAgIC8vICAgICAgIGlmIChkaXIgPT09IFwiZG93blwiKSB7XHJcbiAgICAvLyAgICAgICAgIHRocy5hZGRDbGFzcyhpbkVmZmVjdCkuY3NzKFwib3BhY2l0eVwiLCBcIjFcIik7XHJcbiAgICAvLyAgICAgICB9XHJcbiAgICAvLyAgICAgfSwge1xyXG4gICAgLy8gICAgICAgb2Zmc2V0OiBcIjkwJVwiXHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyAgIH0pO1xyXG4gICAgLy8gfTtcclxuICAgIC8vICQoJy5hbGVydC5pcy1kYW5nZXInKS5hbmltYXRlZCgnYS1zaGFrZScpO1xyXG4gICAgLy8g0JfQsNC60YDRi9GC0Ywg0L/RgNC10LTRg9C/0YDQtdC20LTQtdC90LjQtVxyXG4gICAgJCgnLmFsZXJ0IC5mYS1jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICQodGhpcykuY2xvc2VzdCgnLmFsZXJ0JykuZmFkZU91dCgnc2xvdy80MDAvZmFzdCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcykucmVtb3ZlKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICAkKFwiI2wtdG9wLXNjcm9sbFwiKS5tUGFnZVNjcm9sbDJpZCgpO1xyXG4gICAgLy8g0J/QvtC70LjRhNC40Lsg0LTQu9GPIHBvaW50ZXItZXZlbnRzOiBub25lINCyINCx0YDQsNGD0LfQtdGA0LUgSUU5LCBJRTEwXHJcbiAgICBQb2ludGVyRXZlbnRzUG9seWZpbGwuaW5pdGlhbGl6ZSh7fSk7XHJcbiAgICAvLyDQodC70LDQudC00LXRgNGLXHJcbiAgICBzbGlkZXIgPSAkKCcuc2xpZGVyJyk7XHJcbiAgICAvLyDQodC70LDQudC00LXRgCDQsdCw0L3QvdC10YDQvtCyXHJcbiAgICAkKHNsaWRlcikuY2xvc2VzdCgnLnNsaWRlci1iYW5uZXInKS5zbGljayh7XHJcbiAgICAgIGRvdHM6IHRydWUsXHJcbiAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgIHNwZWVkOiAyMDAwLFxyXG4gICAgICBhdXRvcGxheTogdHJ1ZSxcclxuICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MCxcclxuICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcclxuICAgICAgICAgICAgZG90czogZmFsc2VcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0pO1xyXG4gICAgLy8g0KHQu9Cw0LnQtNC10YAg0LrRg9C/0LjQu9C4INC90LAg0Y3RgtC+0Lkg0L3QtdC00LXQu9C4XHJcbiAgICAkKHNsaWRlcikuY2xvc2VzdCgnLnNsaWRlci1pbWcnKS5zbGljayh7XHJcbiAgICAgIGRvdHM6IHRydWUsXHJcbiAgICAgIHNsaWRlc1RvU2hvdzogNCxcclxuICAgICAgc2xpZGVzVG9TY3JvbGw6IDQsXHJcbiAgICAgIC8vIGFycm93czogZmFsc2VcclxuICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwNjAsXHJcbiAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAzXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBicmVha3BvaW50OiA3NjksXHJcbiAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAyXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBicmVha3BvaW50OiA2NDAsXHJcbiAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9KTtcclxuICB9KTtcclxufSkoalF1ZXJ5KTtcclxuIl0sImZpbGUiOiJzY3JpcHQuanMifQ==
