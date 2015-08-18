bT = ((parent, $) => {

  /*
  * set cursor pointer
  */
  parent.cursor = (id) => {
    $('#' + id).css('cursor', 'pointer');
  };

}(bT || {}, jQuery));
