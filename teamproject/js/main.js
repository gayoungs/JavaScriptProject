//스와이퍼
document.addEventListener("DOMContentLoaded", function () {
  const swiperWrapper = document.querySelector(".swiper-wrapper");
  const imgCount = 17; // 이미지의 총 갯수

  for (let i = 1; i <= imgCount; i++) {
    const swiperSlide = document.createElement("div");
    swiperSlide.classList.add("swiper-slide");

    const img = document.createElement("img");
    img.src = `img/mainimg/${i}.jpeg`;
    swiperSlide.appendChild(img);

    swiperWrapper.appendChild(swiperSlide);
  }

  const swiper = new Swiper(".mySwiper", {
    loop: true,
    autoplay: {
      delay: 1000,
    },
    slidesPerView: 5,
    spaceBetween: 20,
    /* pagination: {
            el: '.swiper-pagination',
            clickable: true,
        }, */
  });
});

//콜백
//네이버
var naver_id_login = new naver_id_login(
  "uOMFoMjRqSv7m2uAIhIF",
  "http://127.0.0.1:5500/index.html"
);
// 접근 토큰 값 출력
// 네이버 사용자 프로필 조회
naver_id_login.get_naver_userprofile("naverSignInCallback()");
// 네이버 사용자 프로필 조회 이후 프로필 정보를 처리할 callback function
function naverSignInCallback() {
  var name = naver_id_login.getProfileData("name");
  sessionStorage.setItem("name", name);
}

//카카오 서버에서 인가 코드를 url주소를 담아서 보내줍니다.
//3. 인가코드 얻기

var urlSearch = new URLSearchParams(location.search);

var value = urlSearch.get("code");

//4. 토큰발급 받기
if (value != null) {
  ajax();
}

function ajax() {
  var url = "http://127.0.0.1:5500/index.html";
  var key = "2fc89e2b2cc7e6d613cf18b688742adc";

  var data =
    "grant_type=authorization_code" +
    "&client_id=" +
    key +
    "&redirect_uri=" +
    url +
    "&code=" +
    value;

  //토큰 요청
  fetch("https://kauth.kakao.com/oauth/token", {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8", //폼형식 (키=값&키=값)
    },
    body: data,
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //브라우저 종료시에 모두 삭제
      //쿠키&세션스토리지에 토큰 값
      sessionStorage.setItem("kakao_access", data.access_token);

      //사용자 정보 API 호출하기
      getUser(data.access_token);

      var name = getUser();
      sessionStorage.setItem("name", getUser.name);
    });
}

//5. 토큰기반으로 API호출하기 JS로 처리
function getUser(token) {
  fetch("https://kapi.kakao.com/v2/user/me", {
    mathod: "post",
    headers: {
      Authorization: "Bearer " + token, //띄어쓰기 무조건 하기
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}
/* 팝업 */
function openPopup() {
  var popupWidth = 1100;
  var popupHeight = 700;
  var left = (window.screen.width - popupWidth) / 2;
  var top = (window.screen.height - popupHeight) / 2;
  var url = "popup.html"; // 팝업에 표시할 URL

  var popupWindow = window.open(
    url,
    "",
    "width=" +
      popupWidth +
      ", height=" +
      popupHeight +
      ", left=" +
      left +
      ", top=" +
      top
  );
}

function checkCookie(name) {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    if (cookie.indexOf(name + "=") === 0) {
      return true; // 쿠키가 존재함
    }
  }

  return false; // 쿠키가 존재하지 않음
}

window.addEventListener("load", function () {
  // 웹 페이지가 로드되었을 때 실행될 코드
  if (checkCookie("popup")) {
    return;
  } else {
    openPopup(); // openPopup 함수를 호출하여 팝업 창을 엽니다.
  }
});
