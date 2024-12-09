document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");
  const buttons = document.querySelectorAll("#filter-buttons button");
  const rssBaseUrl = "https://api.rss2json.com/v1/api.json?rss_url=";
  const rssFeeds = {
    allArticle: "http://www.canews.kr/rss/allArticle.xml",
    clickTop: "http://www.canews.kr/rss/clickTop.xml",
    S1N1: "http://www.canews.kr/rss/S1N1.xml",
    S1N2: "http://www.canews.kr/rss/S1N2.xml",
    S1N3: "http://www.canews.kr/rss/S1N3.xml",
    S1N4: "http://www.canews.kr/rss/S1N4.xml",
    S1N5: "http://www.canews.kr/rss/S1N5.xml",
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

  // RSS 데이터 가져오기 및 캘린더 업데이트
  function fetchAndUpdateCalendar(section) {
    const rssUrl = rssFeeds[section];
    fetch(rssBaseUrl + encodeURIComponent(rssUrl))
      .then((response) => response.json())
      .then((data) => {
        const events = data.items.map((item) => ({
          title: item.title,
          start: new Date(item.pubDate).toISOString(),
          url: item.link,
        }));

        calendar.removeAllEvents();
        calendar.addEventSource(events);
      })
      .catch((error) => {
        console.error("RSS 피드 가져오기 오류:", error);
      });
  }

  // 초기 섹션 로드 (전체기사)
  fetchAndUpdateCalendar("allArticle");

  // 버튼 클릭 이벤트
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      buttons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      const section = this.getAttribute("data-section");
      fetchAndUpdateCalendar(section);
    });
  });
});
