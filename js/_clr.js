bT = ((parent, $) => {

  /*
  * removes all table items
  */
  parent.clr = (id) => {
    $('#' + id + ' tbody tr').remove();
  };

}(bT || {}, jQuery));
