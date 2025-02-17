$(document).ready(function () {
  // Год
  $("#year").text(new Date().getFullYear());

  // SVG
  const replaceSvg = () => {
    $(".svg").each(function () {
      let $img = $(this);
      let imgClass = $img.attr("class");
      let imgURL = $img.attr("src");
      $.get(imgURL, function (data) {
        let $svg = $(data).find("svg");
        if (typeof imgClass !== "undefined") {
          $svg = $svg.attr("class", imgClass + " replaced-svg");
        }
        $svg = $svg.removeAttr("xmlns:a");
        if (!$svg.attr("viewBox") && $svg.attr("height") && $svg.attr("width")) {
          $svg.attr(
            "viewBox",
            "0 0 " + $svg.attr("height") + " " + $svg.attr("width")
          );
        }
        $img.replaceWith($svg);
      });
    });
  };
  replaceSvg();



  // Бургер
  let burger = document.querySelector('#hamburger-menu-mob');
  let menu = document.querySelector('#catalog-drop-mob');
  let menuLinks = menu.querySelectorAll('.catalog-link');
  let closeMenu = menu.querySelector('#close-mob')

  burger.addEventListener('click', function () {
    menu.classList.toggle('active');
    document.body.classList.toggle('stop-scroll');
  });

  closeMenu.addEventListener('click', function () {
    menu.classList.toggle('active');
    document.body.classList.toggle('stop-scroll');
  });

  menuLinks.forEach(function (el) {
    el.addEventListener('click', function () {
      menu.classList.remove('active');
      document.body.classList.remove('stop-scroll')
    })
  });

  ///
  const mobileNav = document.querySelectorAll(".accordion-mob");
  const filterMenu = document.querySelectorAll('.js-accordion');
  let i = 0;

  function accordion(list) {
    list.forEach(e => {
      e.addEventListener("click", function () {
        this.classList.toggle("active");
        const panel = this.querySelector('.panel');
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    });
  }

  accordion(mobileNav);
  accordion(filterMenu);


  ///Фильтры на мобилке 

  const filterBtn = document.querySelector('.filter-mob');
  const filterMobClose = document.querySelector('.filter-mob-close');

  if (filterBtn) {
    filterBtn.addEventListener('click', function () {
      const filterBox = filterBtn.closest('.catalog-filter__nav')
      const filterList = filterBox.querySelector('.catalog-filter__list')
      filterBox.classList.add('active-mob')
      document.body.classList.toggle('stop-scroll');
    })

    filterMobClose.addEventListener('click', function () {
      const filterBox = filterBtn.closest('.catalog-filter__nav')
      const filterList = filterBox.querySelector('.catalog-filter__list')
      filterBox.classList.remove('active-mob')
      document.body.classList.toggle('stop-scroll');
    })

  }



  /// Прокрутка таблицы  

  const tableContainer = document.querySelectorAll('.horizontal-scroll');


  tableContainer.forEach((table) => {

    let isDragging = false;
    let startX, scrollLeft;
    table.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX - table.offsetLeft;
      scrollLeft = table.scrollLeft;
      table.style.cursor = 'grabbing'; // Меняем курсор на "рука сжата"
    });

    table.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - table.offsetLeft;
      const walk = (x - startX) * 2; // Скорость прокрутки
      table.scrollLeft = scrollLeft - walk;
    });

    // Для тач-устройств
    table.addEventListener('touchstart', (e) => {
      isDragging = true;
      startX = e.touches[0].pageX - table.offsetLeft;
      scrollLeft = table.scrollLeft;
    });

    table.addEventListener('touchend', () => {
      isDragging = false;
    });

    table.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.touches[0].pageX - table.offsetLeft;
      const walk = (x - startX) * 2; // Скорость прокрутки
      table.scrollLeft = scrollLeft - walk;
    });

  })
  // Для мыши



  //карусель 

  $('#partnersCarousel').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true, // точки пагинации
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: true, // точки пагинации
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true, // точки пагинации
        }
      }
    ]
  });
  function initSlider(slider) {
    if ($(window).width() < 992) {
      // Инициализация слайдера, если ширина экрана меньше 992px
      $(slider).slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true, // точки пагинации
        responsive: [
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: true // Пагинация остается включенной на всех разрешениях
            }
          }
        ]
      });
    } else {
      // Уничтожение слайдера, если ширина экрана больше или равна 992px
      if ($(slider).hasClass('slick-initialized')) {
        $(slider).slick('unslick');
      }
    }
  }

  // Инициализация слайдера при загрузке страницы
  initSlider('.news-carousel');
  initSlider('.about-slider');

  ///анимация
  AOS.init({
    disable: function () {
      var maxWidth = 992;
      return window.innerWidth < maxWidth;
    }
  });



  // Инициализация слайдера при изменении размера окна
  $(window).resize(function () {
    initSlider('.news-carousel');
    initSlider('.about-slider');
    AOS.init({
      disable: function () {
        var maxWidth = 992;
        return window.innerWidth < maxWidth;
      }
    });

  });




  ///map

  if (document.getElementById('map')) {
    ymaps.ready(function () {
      var myMap = new ymaps.Map('map', {
        center: [53.271363, 36.548694],
        zoom: 14
      }, {
        searchControlProvider: 'yandex#search'
      }),

        // Создаём макет содержимого.
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
          '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),

        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
          // hintContent: 'Собственный значок метки',
          // balloonContent: 'Это красивая метка'
        }, {
          // Опции.
          // Необходимо указать данный тип макета.
          iconLayout: 'default#image',
          // Своё изображение иконки метки.
          iconImageHref: 'assets/img/map2.svg',
          // Размеры метки.
          iconImageSize: [30, 42],
          // Смещение левого верхнего угла иконки относительно
          // её "ножки" (точки привязки).
          iconImageOffset: [-5, -38]
        })



      myMap.geoObjects.add(myPlacemark)

    });
  }


  // кнопка сравнить

  const chekboxForm = document.querySelector('.catalog-add-compare__table-box');


  if (chekboxForm) {
    const inputCheckbox = chekboxForm.querySelectorAll('input');
    $(document).on('change', 'input[type="checkbox"]', function () {
      let countChecked = 0;
      inputCheckbox.forEach((item) => {
        if (item.checked) {
          countChecked++;
        }
      });
      if (countChecked > 1) {
        $('.btn-compare__box').addClass('active');
      } else {
        $('.btn-compare__box').removeClass('active');
      }
    });
  }
  /// SELECT2 
  $('.js-calculator').select2({
    dropdownParent: $('.calculator-page__select-box')
  })

  $('.vacancy__contact-select').select2({
    dropdownParent: $('.vacancy__contact-select-box')
  })

});









