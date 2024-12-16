document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");
  const mapSection = document.getElementById("map-section");
  const calendarSection = document.getElementById("calendar-section");
  const logo = document.querySelector(".logo"); // 로고 요소 선택

  const rssBaseUrl = "https://api.rss2json.com/v1/api.json?rss_url=";
  const rssFeeds = {
    allArticle: "http://www.canews.kr/rss/allArticle.xml",
    clickTop: "http://www.canews.kr/rss/clickTop.xml",
    S1N1: "http://www.canews.kr/rss/S1N1.xml",
    S1N2: "http://www.canews.kr/rss/S1N2.xml",
    S1N3: "http://www.canews.kr/rss/S1N3.xml",
    S1N4: "http://www.canews.kr/rss/S1N4.xml",
  };

  let calendar = new FullCalendar.Calendar(calendarEl, {
    locale: "ko",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
    initialView: "dayGridMonth",
    dayMaxEvents: true,
    events: [],
    eventClick: function (info) {
      info.jsEvent.preventDefault();
      if (info.event.url) {
        window.open(info.event.url, "_blank");
      }
    },
  });

  calendar.render();

  // 초기 상태 설정: 지도 표시, 캘린더 숨김
  mapSection.style.display = "block";
  calendarSection.style.display = "none";

  function fetchAndUpdateCalendar(section) {
    const rssUrl = rssFeeds[section];
    fetch(rssBaseUrl + encodeURIComponent(rssUrl))
      .then((response) => response.json())
      .then((data) => {
        const events = data.items.map((item) => ({
          title: item.title,
          start: new Date(item.pubDate).toISOString(),
          url: item.link,
          allDay: true
        }));

        calendar.removeAllEvents();
        calendar.addEventSource(events);
      })
      .catch((error) => {
        console.error("RSS 피드 가져오기 오류:", error);
      });
  }

  window.showCalendarSection = function (section) {
    mapSection.style.display = "none";    //지도 숨김
    calendarSection.style.display = "block"; //캘린더 표시
    logo.classList.add("small-logo"); // 로고 크기 줄이기 클래스 추가

    setTimeout(() => {
      calendar.updateSize();    //캘린더 크기 업데이트
      fetchAndUpdateCalendar(section); //캘린더 데이터 업데이트
    }, 100);
  };

  window.showMapSection = function () {
    calendarSection.style.display = "none"; //캘린더 숨김
    mapSection.style.display = "block"; //지도 표시
    logo.classList.remove("small-logo"); // 로고 크기 줄이기 클래스 제거
  };

  // 초기 상태에서는 지도만 표시
  showMapSection();
});

//jquery 사용

