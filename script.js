$('#myModal').modal(options) //modal button activation

$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').focus()
}) //modal focus
