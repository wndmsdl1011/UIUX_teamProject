$(document).ready(function () {
  // 초기 상태에서 메시지 숨기기
  $(".click-map").css("opacity", "0");

  // 마우스를 지도 위에 올렸을 때
  $(".map-section").on("mouseenter", function () {
    $(this).find(".click-map").css("opacity", "1"); // 텍스트 보이기
    $(this).find(".map-image").css("transform", "scale(1.5)"); // 확대 효과
  });

  // 마우스가 지도에서 벗어났을 때
  $(".map-section").on("mouseleave", function () {
    $(this).find(".click-map").css("opacity", "0"); // 텍스트 숨기기
    $(this).find(".map-image").css("transform", "scale(1)"); // 원래 크기로 복구
  });
});
