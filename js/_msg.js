bT = ((parent, $) => {

  /*
  * adds a default message when no records found in table
  */
  parent.msg = (id) => {
    let colspan = $('#' + id + ' thead tr th').length;
    base.$el.append('<tr class="boottable-init" ><td colspan="' + colspan + '" ></td></tr>');
  };

}(bT || {}, jQuery));
