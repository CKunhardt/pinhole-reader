let last_known_scroll_position = 0;
let ticking = false;

function updateScrollBar(scroll_pos) {
  let docHeight = $(document).height();
  let winHeight = $(window).height();
  let parentWidth = $('#progress-bar-outer').width();
  let scrollRatio = Math.min(Math.max(1, last_known_scroll_position / (docHeight - winHeight) *  100), 100);
  let newWidth = parentWidth * (scrollRatio/100);
  let newWidthTrunc = Math.round(newWidth);
  let lastWidth = $('#progress-bar-inner').css('width');
  let lastWidthVal = Math.round(Number(lastWidth.substring(0, lastWidth.length - 2)));
  if (lastWidthVal == newWidthTrunc) return
  $('#progress-bar-inner').css('width', newWidthTrunc+"px");
}


window.addEventListener('scroll', function(e) {
  last_known_scroll_position = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(function(timestamp) {
      updateScrollBar(last_known_scroll_position, timestamp);
      ticking = false;
    });

    ticking = true;
  }
});