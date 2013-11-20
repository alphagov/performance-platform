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

  // on load, replace all images with a placeholder (just do this once)
  $('.graph > img').attr('src', 'http://placehold.it/930x400');

});