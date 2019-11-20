$("#pr-moby-dick-modal").on('click', () => {
  $("#pr-moby-dick-modal").css('border', '2px solid blue')
  $("#pr-modal-confirm").removeClass('disabled');
})

$("#pr-modal-confirm").on('click', () => {
  $("#pr-moby-dick").removeClass('pr-display-none');
  $("#pr-moby-dick-modal").addClass('pr-display-none');
})