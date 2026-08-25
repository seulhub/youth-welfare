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

  // con04 텍스트 슬라이드
  var textSwiper = new Swiper(".con04-text-swiper", {
    direction: "vertical",
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    speed: 700,
  });
  // swiper infinite loop

  // con04
  // scroll
  // $(function () {
  //   $(window).on("scroll", function () {
  //     let scrollTop = $(window).scrollTop();
  //     let section = $(".con04");

  //     if (section.length === 0) return;

  //     let sectionTop = section.offset().top;
  //     let sectionHeight = section.height();
  //     let winHeight = $(window).height();
  //     let winWidth = $(window).width();

  //     if (
  //       scrollTop >= sectionTop &&
  //       scrollTop <= sectionTop + sectionHeight - winHeight
  //     ) {
  //       let scrolled = scrollTop - sectionTop;
  //       let maxScroll = sectionHeight - winHeight;
  //       let scrollPercent = scrolled / maxScroll;

  //       // 가로 이동 계산 (흰 여백 방지)
  //       let listWidth = $(".scroll-list").outerWidth();
  //       let moveAmount = (listWidth - winWidth) * scrollPercent;

  //       // 가로 이동 적용
  //       $(".scroll-list").css("transform", `translateX(${-moveAmount}px)`);

  //       // 각 사진마다 개별 회전, 높이 계산(부채꼴)
  //       $(".scroll-list li").each(function () {
  //         // 오버레이

  //         let closestIndex = 0;
  //         let minDistance = Infinity;

  //         $(".scroll-list li").each(function (i) {
  //           let itemCenter = $(this).offset().left + $(this).width() / 2;
  //           let windowCenter = winWidth / 2;

  //           let distance = Math.abs(itemCenter - windowCenter);

  //           if (distance < minDistance) {
  //             minDistance = distance;
  //             closestIndex = i;
  //           }
  //         });

  //         // active 적용
  //         $(".scroll-list li").removeClass("active");
  //         $(".scroll-list li").eq(closestIndex).addClass("active");
  //         //오버레이 끝

  //         // 사진의 현재 화면상 중앙 위치 계산
  //         let itemCenter = $(this).offset().left + $(this).width() / 2;
  //         let windowCenter = winWidth / 2;

  //         // 중앙으로부터의 거리 (멀어질수록 숫자가 커짐)
  //         let distanceFromCenter = itemCenter - windowCenter;

  //         // 곡선 높이 (멀어질수록 translateY값이 커져서 아래로 내려감)
  //         let translateY = Math.abs(distanceFromCenter) * 0.15;

  //         // 회전 각도 (왼쪽은 마이너스, 오른쪽은 플러스 회전)
  //         let rotate = distanceFromCenter * 0.02;

  //         // 크기 조절 (중앙에 올수록 커짐)
  //         let scale = 1.1 - Math.abs(distanceFromCenter) * 0.0005;
  //         if (scale < 0.9) scale = 0.9;

  //         // 개별 사진에 효과 적용
  //         $(this).css({
  //           transform: `translateY(${translateY}px) rotate(${rotate}deg) scale(${scale})`,
  //           transition: "none",
  //           // 스크롤 반응을 즉각적으로 만들기 위함
  //         });
  //       });
  //     }
  //   });
  // });

  // con04 js 수정

  // $(window).on("scroll", function () {
  //   const $section = $(".con04");
  //   const $list = $(".scroll-list");
  //   const $items = $(".scroll-list li");

  //   if ($section.length === 0) return;

  //   let scrollTop = $(window).scrollTop();
  //   let sectionTop = $section.offset().top;
  //   let sectionHeight = $section.outerHeight();
  //   let winHeight = $(window).height();
  //   let winWidth = $(window).width();

  //   if (
  //     scrollTop >= sectionTop &&
  //     scrollTop <= sectionTop + sectionHeight - winHeight
  //   ) {
  //     let progress = (scrollTop - sectionTop) / (sectionHeight - winHeight);

  //     // 가로 이동
  //     let listWidth = $list.outerWidth();
  //     let moveX = (listWidth - winWidth) * progress;

  //     $list.css("transform", `translateX(${-moveX}px)`);

  //     let windowCenter = winWidth / 2;
  //     let closestIndex = 0;
  //     let minDistance = Infinity;

  //     $items.each(function (i) {
  //       let rect = this.getBoundingClientRect();
  //       let itemCenter = rect.left + rect.width / 2;

  //       let distance = Math.abs(itemCenter - windowCenter);

  //       if (distance < minDistance) {
  //         minDistance = distance;
  //         closestIndex = i;
  //       }
  //     });

  //     $items.removeClass("active");
  //     $items.eq(closestIndex).addClass("active");

  //     // 개별 카드 효과
  //     $items.each(function (i) {
  //       let rect = this.getBoundingClientRect();
  //       let itemCenter = rect.left + rect.width / 2;

  //       let distanceFromCenter = itemCenter - windowCenter;

  //       let translateY = Math.abs(distanceFromCenter) * 0.08;
  //       let rotate = distanceFromCenter * 0.02;
  //       let scale = 1.15 - Math.abs(distanceFromCenter) * 0.0004;

  //       if (scale < 0.9) scale = 0.9;

  //       $(this).css({
  //         transform: `translateY(${translateY}px) rotate(${rotate}deg) scale(${scale})`,
  //         transition: "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
  //       });
  //     });
  //   }
  // con04 카드 휠 슬라이드 (최종)

  let currentIndex = 0;
  let isAnimating = false;

  const $scrollList = $(".scroll-list");
  const $scrollItems = $(".scroll-list li");

  function moveCard() {
    const $target = $scrollItems.eq(currentIndex);

    const containerWidth = $(".con04-scroll").width();
    const targetCenter = $target.position().left + $target.outerWidth(true) / 2;

    const moveX = containerWidth / 2 - targetCenter;

    $scrollList.css({
      transform: `translateX(${moveX}px)`,
      transition: "transform 0.6s ease",
    });

    $scrollItems.removeClass("active");
    $target.addClass("active");
  }

  $(".con04-scroll").on("wheel", function (e) {
    const delta = e.originalEvent.deltaY;

    // 마지막 카드면 아래 스크롤 허용
    if (delta > 0 && currentIndex === $scrollItems.length - 1) {
      return;
    }

    // 첫 카드면 위 스크롤 허용
    if (delta < 0 && currentIndex === 0) {
      return;
    }

    // 카드 이동할 때만 기본 스크롤 막기
    e.preventDefault();

    if (isAnimating) return;
    isAnimating = true;

    if (delta > 0) {
      currentIndex++;
    } else {
      currentIndex--;
    }

    moveCard();

    setTimeout(() => {
      isAnimating = false;
    }, 600);
  });

  // 초기
  moveCard();

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
