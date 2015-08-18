bT = ((parent, $) => {

  /*
  * removes all table items
  */
  parent.getColumns = (id) => {
    return $('#' + id + ' thead tr th').map(function() {
      return $(this).text();
    });
  };

}(bT || {}, jQuery));
