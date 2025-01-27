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
  const acc = document.getElementsByClassName("accordion-mob");
  let i = 0;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active");
      const panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }

  // Кнопка наверх
  // const btnUp = {
  //   el: document.querySelector('.btn-up'),
  //   show() {
  //     this.el.classList.remove('btn-up__hide');
  //   },
  //   hide() {
  //     this.el.classList.add('btn-up__hide');
  //   },
  //   addEventListener() {
  //     window.addEventListener('scroll', () => {
  //       const scrollY = window.scrollY || document.documentElement.scrollTop;
  //       scrollY > 400 ? this.show() : this.hide();
  //     });
  //     document.querySelector('.btn-up').onclick = () => {
  //       window.scrollTo({
  //         top: 0,
  //         left: 0,
  //         behavior: 'smooth'
  //       });
  //     }
  //   }
  // }

  // btnUp.addEventListener();



});




