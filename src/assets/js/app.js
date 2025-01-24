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

  ///accordion

  jQuery(document).ready(function ($) {
    $("#accordion").accordionjs({
      // Allow self close.(data-close-able)
      closeAble: true,

      // Close other sections.(data-close-other)
      closeOther: true,

      // Animation Speed.(data-slide-speed)
      slideSpeed: 150,

      // The section open on first init. A number from 1 to X or false.(data-active-index)
      activeIndex: false,

    });
  });

  jQuery(document).ready(function ($) {
    $("#questions").accordionjs({
      // Allow self close.(data-close-able)
      closeAble: true,

      // Close other sections.(data-close-other)
      closeOther: true,

      // Animation Speed.(data-slide-speed)
      slideSpeed: 150,

      // The section open on first init. A number from 1 to X or false.(data-active-index)
      activeIndex: false,

    });
  });


  // Слайдер баннер


  new Swiper(".swiper-staff", {


    navigation: {
      nextEl: ".swiper-staff__swiper-button-next",
      prevEl: ".swiper-staff__swiper-button-prev",
    },
    pagination: {
      el: '.swiper-staff__swiper-pagination',
      clickable: true
    },

    // spaceBetween: 30,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
      1406: {
        slidesPerView: 3,
      },
      1920: {
        slidesPerView: 3,
      },
    },
  });


  new Swiper(".swiper-case", {
    navigation: {
      nextEl: ".swiper-case__swiper-button-next",
      prevEl: ".swiper-case__swiper-button-prev",
    },
    pagination: {
      el: '.swiper-case__swiper-pagination',
      clickable: true
    },
    // spaceBetween: 30,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 2,
      },
      1015: {
        slidesPerView: 3,
      },

    },
  });

  new Swiper(".swiper-reviews-video", {
    navigation: {
      nextEl: ".swiper-reviews-video__swiper-button-next",
      prevEl: ".swiper-reviews-video__swiper-button-prev",
    },
    pagination: {
      el: '.swiper-reviews-video__swiper-pagination',
      clickable: true
    },
    // spaceBetween: 30,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1015: {
        slidesPerView: 3,
      },

    },
  });


  // let widthWindow = window.innerWidth
  // let experienceSwiper = document.querySelector('.swiper-trigger')
  // let experienceGrid = document.querySelector('.experience__list')
  // console.log(widthWindow);
  // if (widthWindow < 1439.9) {
  //   experienceSwiper.classList.add('swiper-experience')
  //   experienceSwiper.classList.add('swiper')
  //   experienceGrid.classList.remove('experience__list')
  // }


  new Swiper(".swiper-experience", {
    pagination: {
      el: '.swiper-experience__swiper-pagination',
      clickable: true
    },

    // spaceBetween: 30,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      891: {
        slidesPerView: 4,
      }
    },
  });


  new Swiper(".swiper-articles", {
    navigation: {
      nextEl: ".swiper-articles__swiper-button-next",
      prevEl: ".swiper-articles__swiper-button-prev",
    },
    pagination: {
      el: '.swiper-articles__swiper-pagination',
      clickable: true
    },

    // spaceBetween: 30,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
      1920: {
        slidesPerView: 3,
      },
    },
  });


  // reviews
  new Swiper(".swiper-reviews", {


    navigation: {
      nextEl: ".swiper-reviews__swiper-button-next",
      prevEl: ".swiper-reviews__swiper-button-prev",
    },
    pagination: {
      el: '.swiper-reviews__swiper-pagination',
      clickable: true
    },

    // spaceBetween: 30,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 2,
      },
      891: {
        slidesPerView: 3,
      },
      1920: {
        slidesPerView: 3,
      },
    },
  });


  new Swiper(".swiper-certificates", {


    navigation: {
      nextEl: ".swiper-certificates__swiper-button-next",
      prevEl: ".swiper-certificates__swiper-button-prev",
    },
    pagination: {
      el: '.swiper-certificates__swiper-pagination',
      clickable: true
    },

    // spaceBetween: 30,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 2,
      },
      891: {
        slidesPerView: 3,
      },
      1920: {
        slidesPerView: 3,
      },
    },
  });


  new Swiper(".swiper-partners", {


    navigation: {
      nextEl: ".swiper-partners__swiper-button-next",
      prevEl: ".swiper-partners__swiper-button-prev",
    },
    pagination: {
      el: '.swiper-partners__swiper-pagination',
      clickable: true
    },

    // spaceBetween: 30,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      891: {
        slidesPerView: 4,
      },
      1920: {
        slidesPerView: 4,
      },
    },
  });


  //tabs

  let tab = document.querySelectorAll('.tab-btn')
  let tabContent = document.querySelectorAll('.tab-content')

  if (tab) {
    tab.forEach(elem => {
      elem.addEventListener('click', () => {

        let parantElem = elem.parentElement.querySelectorAll('.tab-btn')
        parantElem.forEach(pElement => {
          pElement.classList.remove('active')
        });
        let btnId = elem.getAttribute('id')
        elem.classList.add('active')
        tabContent.forEach(i => {
          let contentId = i.getAttribute('data-id')
          i.classList.add('d-n')
          if (btnId == contentId) {
            i.classList.remove('d-n')
          }
        });

      })
    });
  }



  var acc = document.getElementsByClassName("accordion-mob");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }


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





  const btnUp = {
    el: document.querySelector('.btn-up'),
    show() {
      this.el.classList.remove('btn-up__hide');
    },
    hide() {
      this.el.classList.add('btn-up__hide');
    },
    addEventListener() {
      window.addEventListener('scroll', () => {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        scrollY > 400 ? this.show() : this.hide();
      });
      document.querySelector('.btn-up').onclick = () => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }
    }
  }

  btnUp.addEventListener();






  //menu

  let catalogDropp = document.querySelectorAll('.header-bottom__item--drop')

  catalogDropp.forEach(element => {
    // element.addEventListener('click', () => {
    tippy(element, {
      content(reference) {
        const id = reference.getAttribute('data-template');
        const template = document.getElementById(id);
        return template.innerHTML;
      },
      allowHTML: true,
      placement: 'bottom-start',
      arrow: false,
      animation: 'fade',
      trigger: 'mouseenter focus',
      interactive: true
    });
    // })

  });




  $('.input-phone').mask('+7 (999) 999-99-99');




  // форма

  let formCallTop = document.querySelector('.header-call')
  let formCallFooter = document.querySelector('.footer-call')
  let staffCall = document.querySelector('.staff-call')

  let headerCallMob = document.querySelector('.catalog-mobile__btn-call')
  const headerCall = document.getElementById('headerCall');

  document.querySelector('.connect__form-close').addEventListener('click', () => {
    preventDefault()
  })

  tippy(headerCallMob, {
    content: headerCall.innerHTML,
    allowHTML: true,
    placement: 'top',
    arrow: false,
    animation: 'fade',
    trigger: 'click',
    interactive: true,
    onShow(instance) {
      instance.popper.querySelector('.connect__form-close').addEventListener('click', () => {
        instance.hide();
      });
    },
    onHide(instance) {
      instance.popper.querySelector('.connect__form-close').removeEventListener('click', () => {
        instance.hide();
      });
    },
  });



  tippy(formCallTop, {
    content: headerCall.innerHTML,
    allowHTML: true,
    placement: 'bottom-end',
    arrow: false,
    animation: 'fade',
    trigger: 'click',
    interactive: true,

    onShow(instance) {
      instance.popper.querySelector('.connect__form-close').addEventListener('click', () => {
        instance.hide();
      });
    },
    onHide(instance) {
      instance.popper.querySelector('.connect__form-close').removeEventListener('click', () => {
        instance.hide();
      });
    },
  });




  tippy(formCallFooter, {
    content: headerCall.innerHTML,
    allowHTML: true,
    placement: 'top-end',
    arrow: false,
    animation: 'fade',
    trigger: 'click',
    interactive: true,
    onShow(instance) {
      instance.popper.querySelector('.connect__form-close').addEventListener('click', () => {
        instance.hide();
      });
    },
    onHide(instance) {
      instance.popper.querySelector('.connect__form-close').removeEventListener('click', () => {
        instance.hide();
      });
    },
  });



  tippy(staffCall, {
    content: headerCall.innerHTML,
    allowHTML: true,
    placement: 'top-end',
    arrow: false,
    animation: 'fade',
    trigger: 'click',
    interactive: true,
    onShow(instance) {
      instance.popper.querySelector('.connect__form-close').addEventListener('click', () => {
        instance.hide();
      });
    },
    onHide(instance) {
      instance.popper.querySelector('.connect__form-close').removeEventListener('click', () => {
        instance.hide();
      });
    },
  });




  formCallTop.addEventListener('click', () => {
    $('.input-phone').mask('+7 (999) 999-99-99');
  })

  formCallFooter.addEventListener('click', () => {
    $('.input-phone').mask('+7 (999) 999-99-99');
  })




  ///плеер

  let videoBox = document.querySelectorAll('.reviews-video__video-box')

  videoBox.forEach(elem => {
    let videoElem = elem.querySelector('.reviews-video__video')
    dataVideo = videoElem.getAttribute('data-video')
    dataImg = videoElem.getAttribute('data-image')
    dataId = videoElem.getAttribute('id')


    new Playerjs({
      id: dataId,
      file: dataVideo,
      poster: dataImg,
    })


  });



  /// select

  let selectStaff = document.querySelector('.staffs-page__filter-select')
  let selectList = document.querySelector('.staffs-page__filter-select-drop')
  let selectItems = document.querySelectorAll('.staffs-page__filter-select-text')

  if (selectStaff) {
    selectStaff.addEventListener('click', () => {
      event.preventDefault()
      selectStaff.classList.toggle('active')
      selectList.classList.toggle('drop')

      selectItems.forEach(element => {
        element.addEventListener('click', () => {
          event.preventDefault()
          let selectItemsText = element.innerHTML
          let selectItemsValue = element.value
          selectStaff.querySelector('.staffs-page__filter-select-value').innerHTML = selectItemsText
          selectStaff.value = selectItemsValue
          selectStaff.classList.remove('active')
          selectList.classList.remove('drop')
        })
      });
    })
  }
  /// еще 20 регионов

  let regions = document.querySelector('.pers-page__region-other')
  let btnRegions = document.querySelector('.pers-page__region-link')

  if (btnRegions) {
    btnRegions.addEventListener('click', () => {
      regions.classList.remove('d-n')
      btnRegions.classList.add('d-n')

    })
  }



  //модальное окно

  let modalReview = document.querySelector('.modal-bg')
  let btnReview = document.querySelectorAll('.reviews__btn')
  let modalClose = document.querySelector('.reviews__card-modal-close')


  if (btnReview) {
    btnReview.forEach(element => {
      element.addEventListener('click', () => {
        modalReview.classList.remove('d-n')
        body.classList.add('stop-scroll')
      })
    });
  }


  if (modalClose) {

    modalClose.addEventListener('click', () => {
      modalReview.classList.add('d-n')
      body.classList.remove('stop-scroll')
    })

  }


  document.addEventListener('mouseup', function (e) {
    var container = document.querySelector('.modal');
    if (modalClose) {
      if (!container.contains(e.target)) {
        modalReview.classList.add('d-n')
        body.classList.remove('stop-scroll')
      }
    }
  });


  //модальное окно в мобилке
  // let headerCallMob = document.querySelector('.catalog-mobile__btn-call')

  // let CallModalMobClose = document.querySelector('.connect__form-close')

  // let CallModalMob = document.getElementById('headerCall');

  // if (headerCallMob) {

  //   CallModalMob.addEventListener('click', () => {
  //     headerCallMob.classList.remove('d-n')
  //     body.classList.add('stop-scroll')
  //   })

  // }


  // if (CallModalMobClose) {

  //   CallModalMobClose.addEventListener('click', () => {
  //     headerCallMob.classList.add('d-n')
  //     body.classList.remove('stop-scroll')
  //   })

  // }


  // document.addEventListener('mouseup', function (e) {
  //   // var container = document.querySelector('.modal');
  //   if (!headerCallMob.contains(e.target)) {
  //     headerCallMob.classList.add('d-n')
  //     body.classList.remove('stop-scroll')
  //   }
  // });


});




