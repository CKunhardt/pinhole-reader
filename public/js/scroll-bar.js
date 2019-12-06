let last_known_scroll_position = 0;
let ticking = false;
let readingRatio = 0;
let hwRatio = 0;

function updateScrollBar(scroll_pos) {
  let docHeight = $(document).height();
  let winHeight = $(window).height();
  let parentWidth = $('#pr-progress-bar-outer').width();
  let scrollRatio = Math.min(Math.max(1, last_known_scroll_position / (docHeight - winHeight) *  100), 100);
  let newWidth = parentWidth * (scrollRatio/100);
  let newWidthTrunc = Math.round(newWidth);
  let lastWidth = $('#pr-progress-bar-inner').css('width');
  let lastWidthVal = Math.round(Number(lastWidth.substring(0, lastWidth.length - 2)));
  if (lastWidthVal == newWidthTrunc) return
  $('#pr-progress-bar-inner').css('width', newWidthTrunc+"px");

  if(Math.ceil(scrollRatio*10)/10 == 100) {
    $('#pr-button-next').removeClass('pr-display-none');
  }

}
function updateProgressBar(progress_pos) {
  let docHeight = $(document).height();
  let winHeight = $(window).height();
  let parentWidth = $('#side-progress-area').width();
  let scrollRatio = Math.min(Math.max(1, last_known_scroll_position / (docHeight - winHeight) *  100), 100);
  readingRatio = Math.max(scrollRatio, readingRatio);

  let width = readingRatio.toFixed(0).toString();
  let widthStr = width + "%";
  $('#pr-completion-reading').css("width", widthStr);
  $('#pr-completion-reading').prop("aria-valuenow", width)
  $('#pr-completion-reading').text(widthStr)
}

function updateHWBar(progress_pos) {
  let docHeight = $(document).height() * 2.5;
  // This is definitely a wrong heuristic
  // Need to change to the length of homework
  // Probably get the number of words in the readings and => doc / entire reading
  let winHeight = $(window).height();
  let parentWidth = $('#side-progress-area').width();
  let scrollRatio = Math.min(Math.max(1, last_known_scroll_position / (docHeight - winHeight) *  100), 100);
  hwRatio = Math.max(scrollRatio, hwRatio);

  let width = hwRatio.toFixed(0).toString();
  let widthStr = width + "%";
  $('#pr-completion-hw').css("width", widthStr);
  $('#pr-completion-hw').prop('aria-valuenow', width)
  $('#pr-completion-hw').text(widthStr)
}

window.addEventListener('scroll', function(e) {
  last_known_scroll_position = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(function(timestamp) {
      updateScrollBar(last_known_scroll_position, timestamp);
      updateProgressBar(last_known_scroll_position, timestamp);
      updateHWBar(last_known_scroll_position, timestamp);
      ticking = false;
    });

    ticking = true;
  }
});
