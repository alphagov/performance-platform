swapGraph = function(ref) {
  $('#graph').attr('src', graphs[ref]);
};

$(function() {
  // on change of form element, swap the image to the new image specified
  $('#graphControls a').on('click', function(e) {
    e.preventDefault();
    swapGraph($(this).attr('id'));
  });
  $('#graphControls select').on('change', function(e) {
    e.preventDefault();
    swapGraph($(this).val());
  });
});