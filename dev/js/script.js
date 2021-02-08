(function($) {
  // Модуль .hamburger
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');
  hamburger.addEventListener('click', function (event) {
    event.preventDefault();
    event.target.classList.toggle('fa-bars');
    event.target.classList.toggle('fa-times');
    nav.classList.toggle('is-show');
  });

  // Модуль табуляция
  const tabLink = document.querySelector('.tab-links');
  if(tabLink) {
    const tabLinks = tabLink.querySelectorAll('li');
    const tabContent = document.querySelectorAll('.tab-content');
    tabLink.onclick = function (event) {
      let li = event.target.closest('li');
      if (!li) return;
      tabLinks.forEach((el) => el.classList.remove('is-active'));
      tabContent.forEach((el) => el.classList.remove('is-show'));
      li.classList.add('is-active');
      let indexContent = event.target.dataset.showContent;
      tabContent[indexContent].classList.add('is-show');
    };
  }

  // Закрыть предупреждение
  const alertClose = document.querySelectorAll('.alert .fa-close');
  alertClose.forEach(close => {
    close.onclick = function (event) {
      let alertBlock = event.target.closest('.alert');
      if(!alertBlock) return;
      alertBlock.remove();
    }
  });

  // Слайдеры
  var slider = $('.slider');
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
})(jQuery);
