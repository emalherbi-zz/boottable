bT = ((parent, $) => {

  /* get columns thead by field */
  parent.getColumnsByField = (id) => {
    return $('#' + id + ' thead tr th').map(function() {
      return $(this).attr('field');
    });
  };

}(bT || {}, jQuery));
