$(function () {
  // header
  // 메가 메뉴

  $(".gnb-menu > li").mouseenter(function () {
    let i = $(this).index();

    $(".mega-content").removeClass("active");
    $(".mega-content").eq(i).addClass("active");
  });

  // gnb-menu hover하면 사진 바뀜
  $(window).on("scroll", function () {
    $(window).on("scroll", function () {
      if ($(window).scrollTop() > 80) {
        $("header").addClass("scrolled");
      } else {
        $("header").removeClass("scrolled");
      }
    });
  });
  $(".sub-list").mouseenter(function () {
    let i = $(this).index();

    $(".mega-content").removeClass("active");
    $(".mega-content").eq(i).addClass("active");
  });

  // header 아이콘 검색창
  $(".search-btn").on("click", function (e) {
    e.stopPropagation();
    $(".search-box").toggleClass("active");
  });

  // 바깥 클릭 시 닫기
  $(document).on("click", function () {
    $(".search-box").removeClass("active");
  });

  if ($(window).width() <= 1024 && $(window).width() > 768) {
    $(".gnb-menu > li").click(function () {
      let i = $(this).index();
      $(".mega-content").removeClass("active");
      $(".mega-content").eq(i).addClass("active");
      $(".sub-list").css("opacity", "0.2").eq(i).css("opacity", "1");
      // hover 했을 때 효과
      // $(".gnb-menu li").css({ "text-decoration": "none" });
      // $(".gnb-menu li").eq(i).css({ "text-decoration": "underline" });
    });

    $(".sub-list").click(function () {
      let i = $(this).index();
      $(".mega-content").removeClass("active");
      $(".mega-content").eq(i).addClass("active");
      $(".sub-list").css({ opacity: "0.2" }).eq(i).css({ opacity: "1" });
      $(".gnb-menu li").css({ "text-decoration": "none" });
      $(".gnb-menu li").eq(i).css({ "text-decoration": "underline" });
    });
    $("header").mouseleave(function () {
      $(".sub-list").css("opacity", "1");
    });
    // 모바일 메뉴 열기
    $(".m-menu-btn").on("click", function () {
      $(".gnb-menu").addClass("active");
      $(".menu-overlay").addClass("active");
    });

    $(".menu-overlay").on("click", function () {
      $(".gnb-menu").removeClass("active");
      $(this).removeClass("active");
    });

    $(".gnb-menu li a").on("click", function () {
      $(".gnb-menu").removeClass("active");
      $(".menu-overlay").removeClass("active");
    });
  }

  // con01
  // slide

  const $slideList = $(".slide-list");
  const $slideItems = $(".slide-list li");

  // let index = 0;
  const total = $slideItems.length;
  let index = 1;

  // 첫 번째, 마지막 카드 복제
  const $firstClone = $slideItems.first().clone();
  const $lastClone = $slideItems.last().clone();

  // 앞뒤에 붙이기
  $slideList.prepend($lastClone);
  $slideList.append($firstClone);

  // 다시 li 가져오기
  const $allSlides = $(".slide-list li");

  function move() {
    const itemWidth = $allSlides.outerWidth(true);
    // outerWidth() > padding, border까지 포함
    // outerWidth(true) > margin까지 포함

    const containerWidth = $(".slide").width();

    const x = -(itemWidth * index) + (containerWidth - itemWidth) / 2;

    $slideList.css("transform", `translateX(${x}px)`);
  }
  // transition이 끝나면 실행
  $slideList.on("transitionend", function () {
    if (index === total + 1) {
      // transform을 변경해도 애니메이션을 하지 않음
      $slideList.css("transition", "none");

      index = 1;
      move();
    }
  });

  // 자동 슬라이드
  setInterval(function () {
    index++;

    // 끝이면 다시 처음
    if (index >= total) {
      index = 0;
    }

    move();
  }, 3000);

  // 초기 위치
  move();

  // 반응형
  $(window).on("resize", function () {
    move();
  });

  // con03
  // swiper infinite loop
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    loopedSlides: 4,

    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },

    // pagination: {
    //   el: ".swiper-pagination",
    //   clickable: true,
    // },

    navigation: {
      nextEl: ".next",
      prevEl: ".prev",
    },
  });

  swiper.on("slideChange", function () {
    let i = swiper.realIndex;
    $(".con03-radio input").prop("checked", false);
    $(".con03-radio input").eq(i).prop("checked", true);
  });

  $(".con03-radio input").on("click", function () {
    let i = $(".con03-radio input").index(this);
    swiper.slideTo(i);
  });

  // con04 텍스트 롤링
  const tl = gsap.timeline({
    repeat: -1,
    repeatDelay: 0.5,
  });

  tl.to(".text-track", {
    y: -50,
    duration: 0.6,
    ease: "power2.inOut",
  })
    .to({}, { duration: 2 })

    .to(".text-track", {
      y: -100,
      duration: 0.6,
      ease: "power2.inOut",
    })
    .to({}, { duration: 2 })

    .to(".text-track", {
      y: -150,
      duration: 0.6,
      ease: "power2.inOut",
    })
    .set(".text-track", {
      y: 0,
    });

  // con04
  gsap.registerPlugin(ScrollTrigger);

  const con04 = document.querySelector(".con04");
  const scrollList = document.querySelector(".scroll-list");
  const cards = document.querySelectorAll(".scroll-list li");

  let con04ScrollTrigger = [];

  console.log(con04, scrollList, cards);

  // con04 ScrollTrigger 테스트

  gsap.registerPlugin(ScrollTrigger);

  // con04 카드 이동

  gsap.registerPlugin(ScrollTrigger);

  if ($(window).width() > 768) {
    let cardCount = cards.length;

    let pcScroll = gsap.to(scrollList, {
      x: () => {
        const cardWidth = cards[0].offsetWidth;
        const gap = parseFloat(getComputedStyle(scrollList).gap);

        return -(cardWidth + gap) * (cards.length - 1);
      },

      scrollTrigger: {
        trigger: con04,
        start: "top top",
        end: () => `+=${cardCount * 600}`,
        pin: true,
        scrub: 1,

        snap: {
          snapTo: 1 / (cardCount - 1),
          duration: 0.5,
          ease: "power2.out",
        },

        // markers: true,
      },
    });

    // con04 현재 카드 active 처리

    let activeScroll = ScrollTrigger.create({
      trigger: con04,
      start: "top top",
      end: () => `+=${cardCount * 600}`,
      onUpdate: (self) => {
        let index = Math.round(self.progress * (cardCount - 1));

        cards.forEach((card) => {
          card.classList.remove("active");
        });

        cards[index].classList.add("active");
      },
    });
  }

  $(window).on("resize", function () {
    ScrollTrigger.killAll();
    location.reload();
  });

  // con04 모바일

  if ($(window).width() <= 768) {
    gsap.registerPlugin(ScrollTrigger);

    const $mobileCards = $(".con04 .scroll-list li");

    // 카드 2개씩 묶기
    for (let i = 0; i < $mobileCards.length; i += 2) {
      let row = $mobileCards.slice(i, i + 2);

      gsap.from(row, {
        y: 80,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",

        scrollTrigger: {
          trigger: row,
          start: "top 80%",
          end: "top 50%",

          toggleActions: "play none none reverse",
        },
      });

      // 해당 줄 카드 내용 표시
      gsap.to(row.find(".con04-overlay"), {
        opacity: 1,

        scrollTrigger: {
          trigger: row,
          start: "top 60%",
          end: "top 40%",

          toggleActions: "play none none reverse",
        },
      });
    }
  }

  // footer toggle
  // $(document).ready(function () {
  //   $(".info-toggle").on("click", function () {
  //     $(this).find("i").toggleClass("fa-angle-down fa-angle-up");
  //     $(".toggle-content").stop().slideToggle(300);
  //   });
  // });
  $(document).ready(function () {
    $(".info-toggle").on("click", function () {
      $(".toggle-content").stop().slideToggle(300);
      $(this).find("i").toggleClass("on");
    });
    $(".info-toggle").on("mouseenter", function () {
      $(this).find("i").addClass("ready");
    });
    $(".info-toggle").on("mouseleave", function () {
      $(this).find("i").removeClass("ready");
    });
  });
});
