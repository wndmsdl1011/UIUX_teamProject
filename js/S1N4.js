document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");
  const rssUrl = "http://www.canews.kr/rss/S1N4.xml";
  const rssBaseUrl = "https://api.rss2json.com/v1/api.json?rss_url=";

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
  fetch(rssBaseUrl + encodeURIComponent(rssUrl))
    .then((response) => response.json())
    .then((data) => {
      const events = data.items.map((item) => ({
        title: item.title,
        start: new Date(item.pubDate).toISOString(),
        url: item.link,
      }));

      calendar.addEventSource(events);
    })
    .catch((error) => {
      console.error("RSS 피드 가져오기 오류:", error);
    });
});
